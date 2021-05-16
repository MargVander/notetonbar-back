import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserModel } from './model/user.model';

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

  findOneSimple(id: number): Promise<User> {
    return this.userRepository.createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
  }

  findOneToConnect(mail: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.mail = :mail', { mail: mail })
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

  addUser(user: UserModel) {
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

  checkResponse(response: string, mail: string) {
    return this.userRepository.createQueryBuilder('user')
      .where('user.response = :response and user.mail = :mail', { response: response, mail: mail })
      .getOne();
  }

  newMdp(param: any) {
    return this.userRepository.createQueryBuilder()
      .update('user')
      .set({ password: param.password })
      .where('user.response = :response and user.mail = :mail', { response: param.response, mail: param.mail })
      .execute()
  }
}
