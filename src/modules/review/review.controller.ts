import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './models/create-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  async findActives(@Query() query) {
    return this.reviewService.findActives(query.limit | 0);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll() {
    return this.reviewService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() param) {
    return this.reviewService.findOne(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() datas: CreateReviewDto) {
    return this.reviewService.addReview(datas);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param() param, @Body() datas: CreateReviewDto) {
    return this.reviewService.updateReview(param.id, datas);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() param) {
    return this.reviewService.deleteReview(param.id)
  }

}
