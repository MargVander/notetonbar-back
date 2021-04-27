import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BarModule } from './modules/bars/bars.module';
import { PictureModule } from './modules/picture/picture.module';
import { ReviewModule } from './modules/review/review.module';
import { FollowModule } from './modules/follow/follow.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { BullModule } from 'nest-bull';
// import { AuthModule } from './modules/auth/auth.module';

// const bullModule = BullModule.forRoot(mailBullConfig);
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    BarModule,
    PictureModule,
    ReviewModule,
    FollowModule,
    AuthModule,
    // MailerModule.forRootAsync({
    //   useFactory: () => ({
    //     transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    //     defaults: {
    //       from: '"nest-modules" <modules@nestjs.com>',
    //     },
    //     template: {
    //       dir: __dirname + '/templates',
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //     options: {
    //       partials: {
    //         dir: path.join(process.env.PWD, 'templates/pages'),
    //         options: {
    //           strict: true
    //         }
    //       }
    //     }
    //   })
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
