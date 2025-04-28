import { Test, TestingModule } from '@nestjs/testing';
import { NotificationModule } from './notifications.module';
import { NotificationsController } from './notifications.controller';

describe('NotificationModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [NotificationModule],
    }).compile();
  });

  test('should be defined', () => {
    expect(module).toBeDefined();
    const controller = module.get<NotificationsController>(
      NotificationsController,
    );
    expect(controller).toBeDefined();
  });
});
