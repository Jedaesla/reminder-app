import { NotificationApplicationDto } from './notification.dto';

describe('NotificationApplicationDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new NotificationApplicationDto();
    dto.id = 'AAAA-BBBB';
    dto.userId = 'XYZ-ABC';
    dto.reminderId = 'AAA-BBB';
    dto.title = 'Test Title';
    dto.message = 'Test Message';
    dto.sentAt = '2025-04-16 09:00';
    dto.isRead = false;

    expect(dto).toEqual({
      id: 'AAAA-BBBB',
      userId: 'XYZ-ABC',
      reminderId: 'AAA-BBB',
      title: 'Test Title',
      message: 'Test Message',
      sentAt: '2025-04-16 09:00',
      isRead: false,
    });
  });
});
