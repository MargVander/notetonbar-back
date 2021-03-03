import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
  ) {}

  addFollow(ids) {
    return this.followRepository
      .createQueryBuilder()
      .insert()
      .into('Follow')
      .values(ids)
      .execute();
  }

  deleteFollow(ids) {
    return this.followRepository
      .createQueryBuilder()
      .delete()
      .from(Follow)
      .where('followers = :id1 and following= :id2', {
        id1: ids.followers,
        id2: ids.following,
      })
      .execute();
  }
}
