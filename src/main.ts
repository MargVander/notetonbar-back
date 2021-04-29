import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
var cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({origin: 'http://localhost:8080'}));

  const config = new DocumentBuilder()
    .setTitle('Note Ton Bar')
    .setDescription('API pour Note Ton Bar')
    .setVersion('1.0')
    .addTag('bar')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
