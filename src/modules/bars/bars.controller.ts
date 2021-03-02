import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
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
    async findReviews(@Param() param) {
        return this.reviewService.findBarReviews(param.id);
    }

    @Get(':id/rating')
    async getRating(@Param() param) {
        const rating = this.findReviews(param)
            .then(reviews => {
                const average = reviews.reduce((total, next) => total + next.rating, 0) / reviews.length;
                return average
            }
        )
        return rating
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
