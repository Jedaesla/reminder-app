import { NotificationDomainDto } from './notification.dto';

describe('NotificationDomainDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new NotificationDomainDto();
    dto.id = '12345-67890';
    dto.userId = 'XYZ-ABC';
    dto.reminderId = 'YYZZDD';
    dto.title = 'Test Title';
    dto.message = 'Test Message';
    dto.sentAt = '2025-04-16 09:00';
    dto.isRead = false;

    expect(dto).toEqual({
      id: '12345-67890',
      userId: 'XYZ-ABC',
      reminderId: 'YYZZDD',
      title: 'Test Title',
      message: 'Test Message',
      sentAt: '2025-04-16 09:00',
      isRead: false,
    });
  });
});
