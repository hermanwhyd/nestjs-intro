import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // config env
  const configEnv = new ConfigService();

  // swagger docs
  const configSwagger = new DocumentBuilder()
    .setTitle('Simple RqRs')
    .setDescription('The simple request and response stored to mongodb')
    .setVersion('1.0')
    .addTag('default')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup(await configEnv.getSwaggerPath(), app, document);

  // listen api
  await app.listen(await configEnv.getPortConfig());
}
bootstrap();
