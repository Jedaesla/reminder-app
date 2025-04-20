import { CreateReminderApplicationDto } from './create-reminder.dto';

describe('CreateReminderApplicationDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new CreateReminderApplicationDto();
    dto.userId = 'XYZ-ABC';
    dto.title = 'Test Title';
    dto.description = 'Test Description';
    dto.reminderDateTime = '2025-04-16 09:00';
    dto.isCompleted = false;

    expect(dto).toEqual({
      userId: 'XYZ-ABC',
      title: 'Test Title',
      description: 'Test Description',
      reminderDateTime: '2025-04-16 09:00',
      isCompleted: false,
    });
  });
});
