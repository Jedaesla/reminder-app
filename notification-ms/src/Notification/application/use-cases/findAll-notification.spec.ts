import { NotificationModelApplication } from '../persistence/models/notification.model';
import { FindAllNotificationsUseCase } from './findAll-notifications';

describe('FindAllNotificationsUseCase', () => {
  let useCase: FindAllNotificationsUseCase;
  const userId = 'ABCD-EFGH';
  const dataNotifications: NotificationModelApplication[] = [
    {
      userId,
      reminderId: 'AAAA-BBBB',
      id: '12345-67890',
      title: 'Test',
      message: 'Test message',
      sentAt: '2025-02-03 08:00',
      isRead: false,
      createdAt: new Date(),
      available: true,
    },
  ];
  const notificationRepoMock = {
    findAll: jest.fn(),
  };

  beforeEach(() => {
    useCase = new FindAllNotificationsUseCase(notificationRepoMock as any);
    jest.clearAllMocks();
  });

  test('show return all notifications list successfully', async () => {
    notificationRepoMock.findAll.mockResolvedValue(dataNotifications);

    const result = await useCase.execute({ userId, isRead: true });
    expect(notificationRepoMock.findAll).toHaveBeenCalledWith(userId, true);

    expect(result).toEqual([
      {
        userId,
        reminderId: 'AAAA-BBBB',
        id: '12345-67890',
        title: 'Test',
        message: 'Test message',
        sentAt: '2025-02-03 08:00',
        isRead: false,
      },
    ]);
  });
});
