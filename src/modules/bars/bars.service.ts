import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bar } from './models/bars.entity';

@Injectable()
export class BarService {
  constructor(
    @InjectRepository(Bar)
    private barsRepository: Repository<Bar>,
  ) { }

  findAll(): Promise<Bar[]> {
    return this.barsRepository.find();
  }

  findActives(limit: number = 0): Promise<Bar[]> {
    return this.barsRepository
    .createQueryBuilder('bar')
    .leftJoinAndSelect('bar.pictures', 'pictures')
    .leftJoinAndSelect('bar.rating', 'bar_reviews')
    .where('bar.isactive = 1')
    .orderBy("bar.date", "DESC")
    .take(limit)
    .getMany()
  }

  findPopulars(limit: number = 0): Promise<Bar[]> {
    return this.barsRepository
    .createQueryBuilder('bar')
    .leftJoinAndSelect('bar.pictures', 'pictures')
    .leftJoinAndSelect('bar.rating', 'bar_reviews')
    .where('bar.isactive = 1')
    .orderBy("bar_reviews.avg_rating", "DESC")
    .take(limit)
    .getMany()
  }

  findOne(id: number): Promise<Bar> {
    return this.barsRepository
    .findOne(id, { relations: ["pictures", "rating"] })
  }

  addBar(datas:any) {
    return this.barsRepository.save(datas)
  }

  updateBar(datas:any, id: number) {
    datas.terrace = (datas.terrace == 'true');
    return this.barsRepository.update(id, datas)
  }

  deleteBar(id: number) {
    return this.barsRepository.update(id, {isactive : false})
  }
}
