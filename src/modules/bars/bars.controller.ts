import { Controller, Get, Post, Put, Param, Body, Delete, Query } from '@nestjs/common';
import { BarService } from './bars.service';
import { ReviewService } from '../review/review.service';
import { CreateBarDto } from './models/create-bar.dto'

@Controller('bars')
export class BarController {
    constructor(private barsService: BarService, private reviewService: ReviewService) { }

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

    @Get(':id/reviews')
    async findReviews(@Param() param, @Query() query) {
        return this.reviewService.findBarReviews(param.id, query.limit | 0);
    }

    @Post() 
    async create(@Body() datas:CreateBarDto) {
        return this.barsService.addBar(datas);
    }

    @Put(':id')
    async update(@Body() datas:CreateBarDto, @Param() param) {
        return this.barsService.updateBar(datas, param.id)
    }

    @Delete(':id')
    async delete(@Param() param) {
        return this.barsService.deleteBar(param.id)
    }
}
