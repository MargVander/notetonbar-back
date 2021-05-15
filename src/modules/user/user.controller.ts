import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReviewService } from '../review/review.service';
import { UserModel } from './model/user.model';
import { ForgotPasswordModel } from './model/forgotPassword.model';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CheckReponseModel } from './model/checkResponse.model';

@Controller('user')
export class UserController {
  constructor(
    private usersService: UserService,
    private reviewService: ReviewService,
  ) { }

  @Get('all')
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
    console.log(user);
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
}
