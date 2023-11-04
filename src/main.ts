import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

  app.setGlobalPrefix('api/v1');
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/v1/docs', app, document);
  await app.listen(3000);
}
bootstrap();
