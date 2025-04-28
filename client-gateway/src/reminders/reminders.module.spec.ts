import { Test, TestingModule } from '@nestjs/testing';
import { ReminderModule } from './reminders.module';
import { ReminderController } from './reminders.controller';

describe('ReminderModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ReminderModule],
    }).compile();
  });

  test('should be defined', () => {
    expect(module).toBeDefined();
    const controller = module.get<ReminderController>(ReminderController);
    expect(controller).toBeDefined();
  });
});
