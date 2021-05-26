import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowModel } from './model/follow.model';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  addFollow(@Body() ids: FollowModel) {
    console.log(ids);
    console.log(Object.assign(new FollowModel(), ids));
    return this.followService.addFollow(Object.assign(new FollowModel(), ids));
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteFollow(@Body() ids) {
    console.log(ids);
    console.log(Object.assign(new FollowModel(), ids));
    return this.followService.deleteFollow(
      Object.assign(new FollowModel(), ids),
    );
  }
}
