import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.following', 'following')
      .getMany();
  }

  findOne(id: number): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.following', 'following')
      .where('user.isactive = true')
      .andWhere('user.id = :id', { id: id })
      .getMany();
  }

  findOneToConnect(pseudo: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.pseudo = :pseudo', { pseudo: pseudo })
      .getOne();
  }

  findActives(): Promise<unknown[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.following', 'following')
      .where('user.isactive = true')
      .getMany();
  }

  addUser(user) {
    return this.userRepository
      .createQueryBuilder()
      .insert()
      .into('User')
      .values(user)
      .execute();
  }

  deleteUser(id) {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set({ isactive: false })
      .where('id = :id', { id: id.id })
      .execute();
  }

  updateUser(user) {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set(user)
      .where('id = :id', { id: user.id })
      .execute();
  }

  findMail(mail: string) {
    return this.userRepository.createQueryBuilder('user')
      .where('user.mail = :mail', { mail: mail })
      .getOne();
  }
}
