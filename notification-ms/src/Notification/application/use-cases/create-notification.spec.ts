import { CreateNotificationUseCase } from './create-notification';
import { CreateNotificationApplicationDto } from '../dto/create-notification.dto';
import { NotificationModelApplication } from '../persistence/models/notification.model';
import { NotificationDomainDto } from 'src/Notification/domain/dto/notification.dto';

describe('CreateNotificationUseCase', () => {
  let useCase: CreateNotificationUseCase;

  const notificationRepoMock = {
    create: jest.fn(),
  };

  const domainMock = {
    createNotification: jest.fn(),
  };

  const uuidServiceMock = {
    generate: jest.fn(),
  };

  beforeEach(() => {
    useCase = new CreateNotificationUseCase(
      notificationRepoMock as any,
      domainMock as any,
      uuidServiceMock as any,
    );
    jest.clearAllMocks();
  });

  test('should create a notification successfully', async () => {
    const inputDto: CreateNotificationApplicationDto = {
      userId: '1',
      reminderId: '2',
      title: 'Test',
      message: 'Test message',
      sentAt: '2028-08-06 08:00',
      isRead: false,
    };

    const domainNotification: NotificationDomainDto = {
      id: 'abc123',
      ...inputDto,
    };

    const savedNotification: NotificationModelApplication = {
      ...domainNotification,
      createdAt: new Date(),
      available: true,
    };

    domainMock.createNotification.mockReturnValue(domainNotification);
    notificationRepoMock.create.mockResolvedValue(savedNotification);

    const result = await useCase.execute(inputDto);

    expect(domainMock.createNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: '1',
        title: 'Test',
      }),
      uuidServiceMock,
    );

    expect(notificationRepoMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'abc123',
        userId: '1',
        title: 'Test',
      }),
    );

    expect(result).toEqual({
      userId: '1',
      reminderId: '2',
      id: 'abc123',
      title: 'Test',
      message: 'Test message',
      sentAt: inputDto.sentAt,
      isRead: false,
    });
  });
});
