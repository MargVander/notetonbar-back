import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ReviewService } from '../review/review.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService, private reviewService: ReviewService) {}

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
}
