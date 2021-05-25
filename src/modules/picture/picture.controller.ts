import {
    Controller,
    Post,
    Get,
    Res,
    Param,
    Body,
    UseInterceptors,
    UploadedFile,
    Delete,
    UseGuards
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path';
import { PictureService } from './picture.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('pictures')
export class PictureController {
    constructor(private pictureService: PictureService) { }

    @UseGuards(JwtAuthGuard)
    @Post('bar/:id')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './photos',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        })
    )
    async uploadPicture(@UploadedFile() file, @Param() param) {
        return this.pictureService.addPicture(file, param.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':fileId')
    async servePicture(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'photos' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':fileId')
    async deletePicture(@Param('fileId') fileId, @Body() body): Promise<any> {
        const fs = require('fs')
        const path = fileId
        try {
            fs.unlinkSync(`photos/${path}`)
        } catch (err) {
            return err
        }
        return this.pictureService.deletePicture(body.id)
    }
}