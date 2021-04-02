import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({origin: 'http://localhost:8080'}));
  await app.listen(3000);
}
bootstrap();
