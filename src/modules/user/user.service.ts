import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersReposiroty: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersReposiroty
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.following', 'following')
      .getMany();
  }

  findOne(id: number): Promise<User[]> {
    return this.usersReposiroty
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.following', 'following')
      .where('user.isactive = true')
      .andWhere('user.id = :id', { id: id })
      .getMany();
  }

  findActives(): Promise<unknown[]> {
    return this.usersReposiroty
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.following', 'following')
      .where('user.isactive = true')
      .getMany();
  }

  addUser(newUser) {
    return this.usersReposiroty
      .createQueryBuilder()
      .insert()
      .into('User')
      .values(newUser);
  }
}
