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
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path';
import { PictureService } from './picture.service'

@Controller('pictures')
export class PictureController {
    constructor(private pictureService: PictureService) { }

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

    @Get(':fileId')
    async servePicture(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'photos' });
    }

    @Delete(':fileId')
    async deletePicture(@Param('fileId') fileId, @Res() res, @Body() body): Promise<any> {
        const fs = require('fs')
        const path = fileId
        fs.unlinkSync(`photos/${path}`)
        return this.pictureService.deletePicture(body.id)
    }
}