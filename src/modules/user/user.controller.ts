import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Res,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Question } from './entities/user.entity';
import { ReviewService } from '../review/review.service';
import { UserModel } from './model/user.model';
import { ForgotPasswordModel } from './model/forgotPassword.model';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CheckReponseModel } from './model/checkResponse.model';
import { UserSimpleModel } from './model/userSimple.model';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(
    private usersService: UserService,
    private reviewService: ReviewService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() param) {
    return this.usersService.findOneSimple(param.id)
      .then((data) => {
        return Object.assign(new UserSimpleModel(), { "pseudo": data.pseudo, "mail": data.mail, "profile_picture": data.profile_picture })
      })
      .catch(() => { throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND) })
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findActives() {
    return this.usersService.findActives();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/reviews')
  async findReviews(@Param() param) {
    return this.reviewService.findUserReviews(param.id);
  }

  @Get('signUp/question')
  async findQuestions() {
    return Question;
  }

  @Post()
  addUser(@Body() user) {
    return this.usersService.addUser(Object.assign(new UserModel(), user))

  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Body() id) {
    console.log(id.id);
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateUser(@Body() user) {
    return this.usersService.updateUser(Object.assign(new UserModel(), user));
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() req) {
    return this.usersService.findMail(req.mail)
      .then(data =>
        Object.assign(new ForgotPasswordModel(), { "mail": data.mail, "question": data.question })
      )
      .catch(() => { throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND) })
  }

  @Post('checkResponse')
  async checkResponse(@Body() req) {

    return this.usersService.checkResponse(req.response, req.mail)
      .then(data =>
        Object.assign(new CheckReponseModel(), { "mail": data.mail, "reponse": data.response })
      )
      .catch(() => { throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND) })
  }

  @Patch('newMdp')
  async newMdp(@Body() req) {
    return this.usersService.newMdp(req)
      .then(() => {
        return { "response": "ok" };
      })
      .catch(() => { throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND) })

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

  @UseGuards(JwtAuthGuard)
  @Get('avatar/:fileId')
  async servePicture(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'photos' });
  }
}
