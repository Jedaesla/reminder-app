import { UpdateReminderApplicationDto } from './update-reminder.dto';

describe('UpdateReminderApplicationDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new UpdateReminderApplicationDto();
    dto.title = 'Test Title';
    dto.description = 'Test Description';
    dto.reminderDateTime = '2025-04-16 09:00';
    dto.isCompleted = false;

    expect(dto).toEqual({
      title: 'Test Title',
      description: 'Test Description',
      reminderDateTime: '2025-04-16 09:00',
      isCompleted: false,
    });
  });
});
