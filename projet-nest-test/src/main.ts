import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';





async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // // Configuration de CORS
    // app.enableCors({
    //   origin: 'http://localhost:4000', // Adresse de votre frontend
    //   credentials: true,
    // });
    app.use(cors({
      origin: 'http://localhost:4000', // Remplacez par l'URL de votre frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.useGlobalPipes
  (new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
