import { Controller, Get, Post, Param } from '@nestjs/common';
import { BarService } from './bars.service'

@Controller('bars')
export class BarController {
    constructor(private barsService: BarService) {}

    @Get() 
    async findActives() {
        return this.barsService.findActives();
    }

    @Get('all') 
    async findAll() {
        return this.barsService.findAll();
    }

    @Get(':id') 
    async findOne(@Param() param) {
        return this.barsService.findOne(param);
    }

    // @Post() 
    // async create(@Param() param) {
    //     return this.barsService.create(param);
    // }
}
 