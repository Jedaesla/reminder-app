import { DomainController } from './domain.controller';
import { CreateReminderDomainDto } from './dto/create-reminder.dto';
import { ReminderDomainDto } from './dto/reminder.dto';
import { InvalidDataException } from './exceptions/invalid-data.exception';

describe('DomainController', () => {
  let domainController: DomainController;
  let mockUuidService: {
    generateUuid: jest.Mock;
    validateUuid: jest.Mock;
  };

  beforeEach(() => {
    mockUuidService = {
      generateUuid: jest.fn().mockReturnValue('12345-67890'),
      validateUuid: jest.fn().mockReturnValue(true),
    };

    domainController = new DomainController();
  });

  const reminderData: CreateReminderDomainDto = {
    userId: 'ABCD-EFGH',
    title: 'Test Title',
    description: 'Test Description',
    reminderDateTime: '2025-04-12 10:00',
    isCompleted: false,
  };

  test('should create a valid reminder entity', () => {
    const result: ReminderDomainDto = domainController.createReminder(
      reminderData,
      mockUuidService as any,
    );

    expect(result).toBeDefined();
    expect(result.id).toBe('12345-67890');
    expect(result.userId).toBe(reminderData.userId);
    expect(result.title).toBe(reminderData.title);
    expect(result.description).toBe(reminderData.description);
    expect(result.reminderDateTime).toBe(reminderData.reminderDateTime);
    expect(result.isCompleted).toBe(reminderData.isCompleted);
  });

  test('should throw InvalidDataException when reminder is invalid', () => {
    const reminderInvalid = {
      ...reminderData,
      title: ' ',
    };
    expect(() => {
      domainController.createReminder(reminderInvalid, mockUuidService as any);
    }).toThrow(InvalidDataException);
  });
});
