import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import config from 'configs/app.config';

(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(config.app.port);
})();
