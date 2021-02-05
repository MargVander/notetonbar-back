import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bar } from './models/bars.entity'
import { BarController } from './bars.controller';
import { BarService } from './bars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bar])],
  controllers: [BarController],
  providers: [BarService]
})
export class BarModule {}
