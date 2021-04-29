import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './models/review.entity'

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) { }

    findBarReviews(id: number, limit: number = 0): Promise<Review[]> {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoin('review.bar', 'bar')
            .where(`bar.id = ${id}`)
            .andWhere('review.isactive = 1')
            .leftJoinAndSelect('review.user', 'user')
            .andWhere('user.isactive = 1')
            .orderBy("review.date", "DESC")
            .take(limit)
            .getMany()
    }

    findUserReviews(id: number): Promise<Review[]> {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoin('review.user', 'user')
            .where('user.id = :id', { id: id })
            .andWhere('review.isactive = 1')
            .leftJoinAndSelect('review.bar', 'bar')
            .andWhere('bar.isactive = 1')
            .getMany()
    }

    findActives(): Promise<Review[]> {
        return this.reviewRepository.createQueryBuilder('review').where('review.isactive = 1').getMany()
    }

    findAll(): Promise<Review[]> {
        return this.reviewRepository.find()
    }

    findOne(id: number): Promise<Review> {
        return this.reviewRepository.findOne(id)
    }

    addReview(datas: any) {
        return this.reviewRepository.save(datas)
    }

    updateReview(id: number, datas: any) {
        return this.reviewRepository.update(id, datas)
    }

    deleteReview(id: number) {
        return this.reviewRepository.update(id, { isactive: 0 })
    }

}
