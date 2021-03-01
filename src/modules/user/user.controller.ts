import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

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
}
