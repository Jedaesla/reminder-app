import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

// Importamos el bootstrap
import { bootstrap } from './main';

// Mock NestFactory
jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

// el logger
jest.mock('@nestjs/common', () => {
  const actualCommon = jest.requireActual('@nestjs/common');
  return {
    ...actualCommon,
    Logger: jest.fn().mockImplementation(() => ({
      log: jest.fn(),
    })),
  };
});

// Lo que devuelve NestFactory
const mockApp = {
  setGlobalPrefix: jest.fn(),
  useGlobalPipes: jest.fn(),
  useGlobalFilters: jest.fn(),
  listen: jest.fn(),
};

describe('Main bootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  test('should bootstrap the app correctly', async () => {
    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('api');
    expect(mockApp.useGlobalPipes).toHaveBeenCalledWith(
      expect.any(ValidationPipe),
    );
    expect(mockApp.useGlobalFilters).toHaveBeenCalledWith(
      expect.any(RpcCustomExceptionFilter),
    );
    expect(mockApp.listen).toHaveBeenCalledWith(envs.port);
  });
});
