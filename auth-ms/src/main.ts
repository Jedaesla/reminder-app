import { NestFactory } from '@nestjs/core';
import { InfrastructureModule } from './Auth/infrastructure/infrastructure.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';

export async function bootstrap() {
  const logger = new Logger('AuthMs-Main');
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
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  logger.log(`Auth microservice running on port ${envs.port}`);
}
if (require.main === module) {
  bootstrap();
}
