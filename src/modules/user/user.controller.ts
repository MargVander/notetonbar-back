import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReviewService } from '../review/review.service';
import { UserModel } from './model/user.model';

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
    console.log(user);
    return this.usersService.updateUser(Object.assign(new UserModel(), user));
  }
}
