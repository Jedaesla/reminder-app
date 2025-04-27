import { CreateNotificationApplicationDto } from './create-notification.dto';

describe('CreateNotificationApplicationDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new CreateNotificationApplicationDto();
    dto.userId = 'XYZ-ABC';
    dto.reminderId = 'AAA-BBB';
    dto.title = 'Test Title';
    dto.message = 'Test Message';
    dto.sentAt = '2025-04-16 09:00';
    dto.isRead = false;

    expect(dto).toEqual({
      userId: 'XYZ-ABC',
      reminderId: 'AAA-BBB',
      title: 'Test Title',
      message: 'Test Message',
      sentAt: '2025-04-16 09:00',
      isRead: false,
    });
  });
});
