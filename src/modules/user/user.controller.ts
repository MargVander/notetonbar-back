import {
  Body,
  Controller,
  Delete,
  Get,
  Res,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReviewService } from '../review/review.service';
import { UserModel } from './model/user.model';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(
    private usersService: UserService,
    private reviewService: ReviewService,
  ) { }

  @Get('/all')
  async findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findOne(@Param() param) {
    return this.usersService.findOne(param.id);
  }
  //@UseGuards(JwtAuthGuard)
  @Get()
  async findActives() {
    return this.usersService.findActives();
  }

  @Get(':id/reviews')
  async findReviews(@Param() param) {
    return this.reviewService.findUserReviews(param.id);
  }

  @Get('/connect/connect')
  async findUserAuth(@Body() user) {
    return this.usersService.findOneToConnect(user.pseudo);

  }

  @Post()
  addUser(@Body() user) {
    console.log(Object.assign(new UserModel(), user));
    //return this.usersService.addUser(Object.assign(new UserModel(), user));
  }

  @Delete()
  deleteUser(@Body() id) {
    console.log(id.id);
    return this.usersService.deleteUser(id);
  }

  @Put()
  updateUser(@Body() user) {
    return this.usersService.updateUser(Object.assign(new UserModel(), user));
  }

  @Post('avatar/:id')
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
      return this.usersService.addPicture(file.filename, param.id)
    }

    @Get('avatar/:fileId')
    async servePicture(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'photos' });
    }
}
