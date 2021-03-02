import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BarModule } from './modules/bars/bars.module';
import { PictureModule } from './modules/picture/picture.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    BarModule,
    PictureModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
