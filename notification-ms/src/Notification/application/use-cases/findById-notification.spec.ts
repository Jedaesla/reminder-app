import { UseCaseException } from '../exceptions/use-case.exception';
import { NotificationModelApplication } from '../persistence/models/notification.model';
import { FindNotificationByIdUseCase } from './findById-notification';

describe('FindNotificationByIdUseCase', () => {
  let useCase: FindNotificationByIdUseCase;
  const idNotification = 'ABCD-EFGH';
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
    findById: jest.fn(),
  };

  beforeEach(() => {
    useCase = new FindNotificationByIdUseCase(notificationRepoMock as any);
    jest.clearAllMocks();
  });

  test('should return a notification with id selected', async () => {
    notificationRepoMock.findById.mockResolvedValue(dataNotification);

    const result = await useCase.execute(idNotification);
    expect(notificationRepoMock.findById).toHaveBeenCalledWith(idNotification);

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
  test('show throw error when id is not found', async () => {
    notificationRepoMock.findById.mockResolvedValue(null);

    await expect(useCase.execute(idNotification)).rejects.toThrow(
      UseCaseException,
    );
    expect(notificationRepoMock.findById).toHaveBeenCalledWith(idNotification);
  });
});
