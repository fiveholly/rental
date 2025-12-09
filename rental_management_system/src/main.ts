import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as express from 'express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(process.env.TZ || 'Asia/Shanghai');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
