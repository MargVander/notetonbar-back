import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewModule } from '../review/review.module';
import { Bar } from './models/bars.entity'
import { BarController } from './bars.controller';
import { BarService } from './bars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bar]), ReviewModule],
  controllers: [BarController],
  providers: [BarService]
})
export class BarModule {}
