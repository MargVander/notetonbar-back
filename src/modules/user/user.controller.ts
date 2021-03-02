import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

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

  @Post()
  async addUser(@Body() newUser: any) {
    console.log(new User(...newUser));
    return 'ok';
  }

  //@Delete()

  //@Put()
}
