import { DomainController } from './domain.controller';
import { CreateNotificationDomainDto } from './dto/create-notification.dto';
import { NotificationDomainDto } from './dto/notification.dto';
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

  const notificationData: CreateNotificationDomainDto = {
    userId: 'ABCD-EFGH',
    reminderId: 'HIJK-LMNOP',
    title: 'Test Title',
    message: 'Test Message',
    sentAt: '2025-04-12 10:00',
    isRead: false,
  };

  test('should create a valid notification entity', () => {
    const result: NotificationDomainDto = domainController.createNotification(
      notificationData,
      mockUuidService as any,
    );

    expect(result).toBeDefined();
    expect(result.id).toBe('12345-67890');
    expect(result.userId).toBe(notificationData.userId);
    expect(result.reminderId).toBe(notificationData.reminderId);
    expect(result.title).toBe(notificationData.title);
    expect(result.message).toBe(notificationData.message);
    expect(result.sentAt).toBe(notificationData.sentAt);
    expect(result.isRead).toBe(notificationData.isRead);
  });

  test('should throw InvalidDataException when notification is invalid', () => {
    const notificationInvalid = {
      ...notificationData,
      title: ' ',
    };
    expect(() => {
      domainController.createNotification(
        notificationInvalid,
        mockUuidService as any,
      );
    }).toThrow(InvalidDataException);
  });
});
