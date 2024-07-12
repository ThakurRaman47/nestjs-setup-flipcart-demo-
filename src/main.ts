import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  // Swagger setup
  const config = new DocumentBuilder()
  .setTitle('My Demo APIS')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('DEMO APIS')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalFilters();
  SwaggerModule.setup('api', app, document);

  //pipes to validate HTTP payload
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
