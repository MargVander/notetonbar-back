import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Follow } from './entities/follow.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersReposiroty: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersReposiroty.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersReposiroty.findOne(id);
  }

  findActives(): Promise<unknown[]> {
    return this.usersReposiroty
      .createQueryBuilder('user')

      .leftJoinAndSelect('user.followers', 'followers')
      .where('user.isactive = true')
      .getMany();
    /* .leftJoinAndSelect('user.followers', 'followers')
           .innerJoinAndSelect(Follow, 'follow', 'follow.followersId = user.id')

           */
  }
}
