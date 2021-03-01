import { Controller, Get, Post, Param } from '@nestjs/common';
import { BarService } from './bars.service';
import { ReviewService } from '../review/review.service';

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
                console.log(average)
                return average
            }
        )
        return rating
    }

    // @Post() 
    // async create(@Param() param) {
    //     return this.barsService.create(param);
    // }
}
