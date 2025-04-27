import { Test, TestingModule } from '@nestjs/testing';
import { InfrastructureController } from './infrastructure.controller';
import { ApplicationInterface } from 'src/Notification/application/application.interface';
import { UuidService } from '../persistence/services/uuid.service';
import { RpcException } from '@nestjs/microservices';

const dataInputNotification = {
  userId: 'XYZ-ABC',
  reminderId: 'AAA-BBB',
  title: 'Test Title',
  message: 'Test Message',
  sentAt: '2025-04-16 09:00',
  isRead: false,
};
const idNotification = '12345-67890';
const dataResult = {
  id: idNotification,
  ...dataInputNotification,
};

describe('InfrastructureController', () => {
  let controller: InfrastructureController;
  let mockApplication: jest.Mocked<ApplicationInterface>;

  beforeEach(async () => {
    mockApplication = {
      createNotification: jest.fn(),
      findNotificationById: jest.fn(),
      findAllNotifications: jest.fn(),
      updateNotification: jest.fn(),
      deleteNotification: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfrastructureController],
      providers: [
        { provide: ApplicationInterface, useValue: mockApplication },
        { provide: UuidService, useValue: {} },
      ],
    }).compile();

    controller = module.get<InfrastructureController>(InfrastructureController);
  });

  test('should create a notification', async () => {
    mockApplication.createNotification.mockResolvedValue(dataResult);

    const result = await controller.create(dataInputNotification);

    expect(mockApplication.createNotification).toHaveBeenCalledWith(
      dataInputNotification,
      {}, // mock del uuidService
    );

    expect(result).toEqual(dataResult);
  });

  test('should find a notification by ID', async () => {
    mockApplication.findNotificationById.mockResolvedValue(dataResult);

    const result = await controller.findById(idNotification);

    expect(mockApplication.findNotificationById).toHaveBeenCalledWith(
      idNotification,
    );
    expect(result).toEqual(dataResult);
  });

  test('should throw RpcException error in findById', async () => {
    mockApplication.findNotificationById.mockRejectedValue(
      new Error('Not found'),
    );
    await expect(controller.findById(idNotification)).rejects.toThrow(
      RpcException,
    );
  });

  test('should find all notifications', async () => {
    mockApplication.findAllNotifications.mockResolvedValue([dataResult]);

    const result = await controller.findAll({
      userId: dataInputNotification.userId,
      isRead: false,
    });

    expect(mockApplication.findAllNotifications).toHaveBeenCalledWith(
      dataInputNotification.userId,
      false,
    );
    expect(result).toEqual([dataResult]);
  });

  test('should update a notification', async () => {
    mockApplication.updateNotification.mockResolvedValue(dataResult);

    const result = await controller.update({
      id: idNotification,
      isRead: false,
    });

    expect(mockApplication.updateNotification).toHaveBeenCalledWith(
      idNotification,
      false,
    );
    expect(result).toEqual(dataResult.isRead);
  });

  test('should delete a notification', async () => {
    mockApplication.deleteNotification.mockResolvedValue(true);
    const result = await controller.delete(idNotification);

    expect(mockApplication.deleteNotification).toHaveBeenCalledWith(
      idNotification,
    );
    expect(result).toEqual(true);
  });
});
