import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }
    @Get(':id')
    async findOne(@Param() param) {
        return this.usersService.findOne(param.id)
    }
}