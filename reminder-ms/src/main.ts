import { NestFactory } from '@nestjs/core';
import { InfrastructureModule } from './Remider/infrastructure/infrastructure.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('ReminderMS-Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InfrastructureModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen();
  logger.log(`Reminder Microservice running on port ${envs.port}`);
}
bootstrap();
