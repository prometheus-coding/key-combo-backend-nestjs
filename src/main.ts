import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// cors
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  /*
      //  cors abilitato
        const corsOptions: CorsOptions = {
          origin: 'http://localhost:3000/',
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
          allowedHeaders: 'Content-Type, Accept',
          credentials: true
        };
      */
  app.enableCors(); // abilitato cors per ricevere posto da front
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('K-Combo API')
    .setDescription('The K-Combo REST API description')
    .setVersion('1.0')
    .build();
  const options: SwaggerCustomOptions = {
    yamlDocumentUrl: 'api-yaml'
  }
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, options);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
