import { Body, Controller, Delete, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowModel } from './model/follow.model';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post()
  addFollow(@Body() ids: FollowModel) {
    console.log(ids);
    console.log(Object.assign(new FollowModel(), ids));
    return this.followService.addFollow(Object.assign(new FollowModel(), ids));
  }

  @Delete()
  deleteFollow(@Body() ids) {
    console.log(ids);
    console.log(Object.assign(new FollowModel(), ids));
    return this.followService.deleteFollow(
      Object.assign(new FollowModel(), ids),
    );
  }
}
