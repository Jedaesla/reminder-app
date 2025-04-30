import { NestFactory } from '@nestjs/core';
import { InfrastructureModule } from './Auth/infrastructure/infrastructure.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { envs } from './config';
import { bootstrap } from './main';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    createMicroservice: jest.fn(),
  },
}));

const mockUseGlobalPipes = jest.fn();
const mockListen = jest.fn();

const mockApp = {
  useGlobalPipes: mockUseGlobalPipes,
  listen: mockListen,
};

describe('bootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (NestFactory.createMicroservice as jest.Mock).mockResolvedValue(mockApp);
  });

  test('should create microservice, apply pipes, listen, and log', async () => {
    const logSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();

    await bootstrap();

    expect(NestFactory.createMicroservice).toHaveBeenCalledWith(
      InfrastructureModule,
      {
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    );

    expect(mockUseGlobalPipes).toHaveBeenCalledWith(expect.any(ValidationPipe));

    expect(mockListen).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      `Auth microservice running on port ${envs.port}`,
    );
  });
});
