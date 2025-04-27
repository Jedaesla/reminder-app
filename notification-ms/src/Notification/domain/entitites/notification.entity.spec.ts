import { NotificationEntity } from './notification.entity';
import { CreateNotificationDomainDto } from '../dto/create-notification.dto';

describe('NotificationEntity', () => {
  let mockUuidService: {
    generateUuid: jest.Mock;
    validateUuid: jest.Mock;
  };

  beforeEach(() => {
    mockUuidService = {
      generateUuid: jest.fn().mockReturnValue('ABCD-EFGH'),
      validateUuid: jest.fn().mockReturnValue(true),
    };
  });

  const createDto: CreateNotificationDomainDto = {
    userId: '1234-5678',
    reminderId: 'XYZ-1234',
    title: 'Test notification',
    message: 'Test message',
    sentAt: '2025-04-12 10:00',
    isRead: false,
  };

  test('should create a notification successfully and valide it', () => {
    const notificationEntity = new NotificationEntity(mockUuidService as any);
    notificationEntity.create(createDto);

    expect(notificationEntity.id).toBe('ABCD-EFGH');
    expect(notificationEntity.userId).toBe(createDto.userId);
    expect(notificationEntity.reminderId).toBe(createDto.reminderId);
    expect(notificationEntity.title).toBe(createDto.title);
    expect(notificationEntity.message).toBe(createDto.message);
    expect(notificationEntity.sentAt).toBe(createDto.sentAt);
    expect(notificationEntity.isRead).toBe(createDto.isRead);
    expect(notificationEntity.isValid()).toBe(true);
    expect(notificationEntity.getErrors().size).toBe(0);
  });

  test('should get invalid create notification when UUID, userId, reminderId and title is not valid', () => {
    mockUuidService.validateUuid.mockReturnValue(false);
    const notificationEntity = new NotificationEntity(mockUuidService as any);
    notificationEntity.create({
      userId: '',
      reminderId: '',
      title: ' ',
      message: '',
      sentAt: '',
      isRead: false,
    });

    expect(notificationEntity.isValid()).toBe(false);
    expect(notificationEntity.getErrors().has('id')).toBe(true);
    expect(notificationEntity.getErrors().has('userId')).toBe(true);
    expect(notificationEntity.getErrors().has('reminderId')).toBe(true);
    expect(notificationEntity.getErrors().has('title')).toBe(true);
  });
});
