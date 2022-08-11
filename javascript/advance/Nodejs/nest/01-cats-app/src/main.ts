import { Logger, ValidationPipe } from './common';
import { NestFactory } from './core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  const logger = new Logger('bootstrap')
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
