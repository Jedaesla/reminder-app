import { CreateNotificationDomainDto } from './create-notification.dto';

describe('CreateNotificationDomainDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new CreateNotificationDomainDto();
    dto.userId = '12345-67890';
    dto.reminderId = 'XYZ-ABC';
    dto.title = 'Test Title';
    dto.message = 'Test Message';
    dto.sentAt = '2025-04-16 09:00';
    dto.isRead = false;

    expect(dto).toEqual({
      userId: '12345-67890',
      reminderId: 'XYZ-ABC',
      title: 'Test Title',
      message: 'Test Message',
      sentAt: '2025-04-16 09:00',
      isRead: false,
    });
  });
});
