import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './models/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersReposiroty: Repository<Users>,
    ) { }

    findAll(): Promise<Users[]> {
        return this.usersReposiroty.find();
    }

    findOne(id: number): Promise<Users> {
        return this.usersReposiroty.findOne(id);
    }
}
