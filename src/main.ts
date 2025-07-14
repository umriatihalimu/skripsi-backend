import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './authMiddleware';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use("/upload", express.static(join(__dirname, '..', 'upload')))
  app.use(new AuthMiddleware().use);

  await app.listen(3001);
}
bootstrap();
