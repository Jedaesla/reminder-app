import { CreateNotificationDomainDto } from './create-notification.dto';

describe('CreateNotificationDomainDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new CreateNotificationDomainDto();
    dto.userId = 'XYZ-ABC';
    dto.reminderId = 'YYZZDD';
    dto.title = 'Test Title';
    dto.message = 'Test Message';
    dto.sentAt = '2025-04-16 09:00';
    dto.isRead = false;

    expect(dto).toEqual({
      userId: 'XYZ-ABC',
      reminderId: 'YYZZDD',
      title: 'Test Title',
      message: 'Test Message',
      sentAt: '2025-04-16 09:00',
      isRead: false,
    });
  });
});
