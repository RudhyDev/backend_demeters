import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle('API Demeters')
      .setDescription('Documentação da API Demeters')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    try {
      writeFileSync('./swagger.json', JSON.stringify(document));
    } catch (error) {
      logger.error('Failed to write swagger file', error);
    }

    SwaggerModule.setup('api', app, document);
    app.enableShutdownHooks();

    await app.listen(port);
    logger.log(`Application started on port ${port}`);
  } catch (error) {
    logger.error('Failed to start application', error);
    process.exit(1);
  }
}
bootstrap();
