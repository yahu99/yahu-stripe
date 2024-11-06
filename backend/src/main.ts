import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './application/filters/errors.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_AUTH } from './shared/swagger-auth';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3001', // Разрешаем запросы с фронтенда
    credentials: true,
  });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('API')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        SWAGGER_AUTH,
      )
      .build(),
  );

  SwaggerModule.setup('documentation', app, document);
  app.use('/stripe/webhook', bodyParser.raw({ type: 'application/json' }));

  app.use(bodyParser.json());

  await app.listen(3000);
}

bootstrap();
