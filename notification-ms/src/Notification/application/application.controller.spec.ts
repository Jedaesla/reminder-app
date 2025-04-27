import { ApplicationController } from './application.controller';
import { NotificationApplicationRepository } from './persistence/repositories/notification.repository';
import { NotificationModelApplication } from './persistence/models/notification.model';
import { Domain } from '../domain/domain.interface';
import { UuidDomainService } from '../domain/services/uuid.service';
import { NotificationApplicationDto } from './dto/notification.dto';
import { CreateNotificationUseCase } from './use-cases/create-notification';
import { DeleteNotificationUseCase } from './use-cases/delete-notification';
import { FindAllNotificationsUseCase } from './use-cases/findAll-notifications';
import { FindNotificationByIdUseCase } from './use-cases/findById-notification';
import { UpdateNotificationUseCase } from './use-cases/update-notification';
import { CreateNotificationApplicationDto } from './dto/create-notification.dto';

jest.mock('./use-cases/create-notification');
jest.mock('./use-cases/delete-notification');
jest.mock('./use-cases/findAll-notifications');
jest.mock('./use-cases/findById-notification');
jest.mock('./use-cases/update-notification');

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let repo: jest.Mocked<
    NotificationApplicationRepository<NotificationModelApplication>
  >;
  let domain: jest.Mocked<Domain>;
  let uuidService: jest.Mocked<UuidDomainService>;

  beforeEach(() => {
    repo = { findById: jest.fn(), findAll: jest.fn() } as any;
    domain = {} as any;
    uuidService = { generateUuid: jest.fn(), validateUuid: jest.fn() } as any;

    controller = new ApplicationController(repo, domain);
  });

  const idNotification = 'AAAA-BBBB';
  const dataNotification: CreateNotificationApplicationDto = {
    userId: 'XYZ-ABC',
    reminderId: 'AAA-BBB',
    title: 'Test Title',
    message: 'Test Message',
    sentAt: '2025-04-16 09:00',
    isRead: false,
  };
  const dataResult: NotificationApplicationDto = {
    id: idNotification,
    ...dataNotification,
  };

  test('should create a notification', async () => {
    (
      CreateNotificationUseCase.prototype.execute as jest.Mock
    ).mockResolvedValue(dataResult);

    const result = await controller.createNotification(
      dataNotification,
      uuidService,
    );
    expect(result).toEqual(dataResult);
  });

  test('should find notification by id', async () => {
    (
      FindNotificationByIdUseCase.prototype.execute as jest.Mock
    ).mockResolvedValue(dataResult);
    const result = await controller.findNotificationById(idNotification);
    expect(result).toEqual(dataResult);
  });

  test('should find all notifications', async () => {
    (
      FindAllNotificationsUseCase.prototype.execute as jest.Mock
    ).mockResolvedValue([dataResult]);

    const result = await controller.findAllNotifications(
      dataNotification.userId,
      true,
    );
    expect(result).toEqual([dataResult]);
  });

  test('should update a notification', async () => {
    (
      UpdateNotificationUseCase.prototype.execute as jest.Mock
    ).mockResolvedValue(dataResult);

    const result = await controller.updateNotification(idNotification, true);
    expect(result).toEqual(dataResult);
  });

  test('should delete a notification', async () => {
    (
      DeleteNotificationUseCase.prototype.execute as jest.Mock
    ).mockResolvedValue(true);
    const result = await controller.deleteNotification(idNotification);
    expect(result).toBe(true);
  });
});
