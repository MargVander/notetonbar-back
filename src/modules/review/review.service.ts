import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './models/review.entity'

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) {}

    findBarReviews(id: number): Promise<Review[]> {
        return this.reviewRepository.createQueryBuilder('review').leftJoin('review.bar', 'bar').where('bar.id = :id', {id: id}).andWhere('review.isactive = 1').leftJoinAndSelect('review.user', 'user').getMany()
    }

    findUserReviews(id: number): Promise<Review[]> {
        return this.reviewRepository.createQueryBuilder('review').leftJoin('review.user', 'user').where('user.id = :id', {id: id}).andWhere('review.isactive = 1').leftJoinAndSelect('review.bar', 'bar').getMany()
    }

}
