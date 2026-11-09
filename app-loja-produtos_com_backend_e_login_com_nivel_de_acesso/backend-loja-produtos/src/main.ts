import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule} from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // app.useGlobalFilters(new HttpExceptionFilter());

  //Expose e Exclude
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(new ValidationPipe({
    //considera somente as propriedades da 
    //requisição que combinam com o DTO.
    whitelist: true, 

    //lança os erros
    // forbidNonWhitelisted: true, 

    transform: true,
    transformOptions: {
      //conversão automática
      // enableImplicitConversion: true 
    }
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
