import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
  });

  test('should be defined', () => {
    expect(module).toBeDefined();
    const controller = module.get<AuthController>(AuthController);
    expect(controller).toBeDefined();
  });
});
