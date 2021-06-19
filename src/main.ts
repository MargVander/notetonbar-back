import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
require('dotenv/config');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Note Ton Bar')
    .setDescription('API pour Note Ton Bar')
    .setVersion('1.0')
    .addTag('bar')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(process.env.NODE_ENV)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
