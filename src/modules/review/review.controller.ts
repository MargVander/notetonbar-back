import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './models/create-review.dto'

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}


  @Get()
  async findActives(@Query() query) {
    return this.reviewService.findActives(query.limit | 0);
  }

  @Get('/all')
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param() param) {
    return this.reviewService.findOne(param.id);
  }

  @Post()
  async create(@Body() datas:CreateReviewDto) {
    return this.reviewService.addReview(datas);
  }

  @Put(':id')
  async update(@Param() param, @Body() datas:CreateReviewDto) {
    return this.reviewService.updateReview(param.id, datas);
  }

  @Delete(':id')
  async delete(@Param() param) {
    return this.reviewService.deleteReview(param.id)
}
  
}
