import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); //Aceptar todas las peticiones desde cualquier pagina
  //Nos permite validar sin necesidad de repetir codigo (unicamente las rutas con dto o clases de validacion)
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true //Limpia los campos añadidos no esperados
  }))
  await app.listen(3001);
}
bootstrap();
