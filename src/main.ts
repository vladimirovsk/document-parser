import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(`/api/${process.env.VERSION}`);

  const config = new DocumentBuilder()
    .setTitle('API DOCUMENT COMPARE')
    .setDescription('DOCUMENT COMPARE')
    .setVersion('0.1')
    .addTag('documents')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);


  await app.listen(process.env.REST_PORT ?? 3000,  async () => {
    logger.debug(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
