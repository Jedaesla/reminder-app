import { NotificationModelApplication } from '../persistence/models/notification.model';
import { UpdateNotificationUseCase } from './update-notification';

describe('UpdateNotificationUseCase', () => {
  let useCase: UpdateNotificationUseCase;
  const idNotification = '12345-67890';
  const dataNotification: NotificationModelApplication = {
    userId: 'XYZ-123',
    reminderId: 'AAAA-BBBB',
    id: idNotification,
    title: 'Test',
    message: 'Test message',
    sentAt: '2025-02-03 08:00',
    isRead: false,
    createdAt: new Date(),
    available: true,
  };
  const notificationRepoMock = {
    update: jest.fn(),
  };

  beforeEach(() => {
    useCase = new UpdateNotificationUseCase(notificationRepoMock as any);
    jest.clearAllMocks();
  });

  test('should update the notification successsfully', async () => {
    notificationRepoMock.update.mockResolvedValue(dataNotification);

    const result = await useCase.execute(
      idNotification,
      dataNotification.isRead,
    );
    expect(notificationRepoMock.update).toHaveBeenCalledWith(
      idNotification,
      dataNotification.isRead,
    );

    expect(result).toEqual({
      userId: 'XYZ-123',
      reminderId: 'AAAA-BBBB',
      id: idNotification,
      title: 'Test',
      message: 'Test message',
      sentAt: '2025-02-03 08:00',
      isRead: false,
    });
  });
});
