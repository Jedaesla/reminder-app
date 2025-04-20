import { ReminderDomainDto } from './reminder.dto';

describe('ReminderDomainDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new ReminderDomainDto();
    dto.id = '12345-67890';
    dto.userId = 'XYZ-ABC';
    dto.title = 'Test Title';
    dto.description = 'Test Description';
    dto.reminderDateTime = '2025-04-16 09:00';
    dto.isCompleted = false;

    expect(dto).toEqual({
      id: '12345-67890',
      userId: 'XYZ-ABC',
      title: 'Test Title',
      description: 'Test Description',
      reminderDateTime: '2025-04-16 09:00',
      isCompleted: false,
    });
  });
});
