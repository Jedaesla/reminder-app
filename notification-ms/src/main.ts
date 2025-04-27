import { NestFactory } from '@nestjs/core';
import { InfrastructureModule } from './Notification/infrastructure/infrastructure.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export async function bootstrap() {
  const logger = new Logger('NotificationMS-Main');

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
  logger.log(`Notification Microservice running on port ${envs.port}`);
}
//bootstrap();

if (require.main === module) {
  //solo ejecutarlo cuando se invoca este archivo directamente
  bootstrap();
}
