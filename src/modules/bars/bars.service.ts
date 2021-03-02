import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bar } from './models/bars.entity';
import { CreateBarDto } from './models/create-bar.dto'

@Injectable()
export class BarService {
  constructor(
    @InjectRepository(Bar)
    private barsRepository: Repository<Bar>,
  ) { }

  findAll(): Promise<Bar[]> {
    return this.barsRepository.find();
  }

  findActives(): Promise<Bar[]> {
    return this.barsRepository.createQueryBuilder('bar').leftJoinAndSelect('bar.pictures', 'pictures').where('bar.isactive = 1').getMany()
  }

  findOne(id: number): Promise<Bar> {
    return this.barsRepository.findOne(id, { relations: ["pictures"] });
  }

  addBar(datas:any) {
    return this.barsRepository.save(datas)
  }

  updateBar(datas:any, id: number) {
    return this.barsRepository.update(id, datas)
  }

  deleteBar(id: number) {
    return this.barsRepository.update(id, {isactive : false})
  }
}
