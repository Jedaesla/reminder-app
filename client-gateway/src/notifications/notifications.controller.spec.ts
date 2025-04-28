import { NotificationsController } from './notifications.controller';
import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { NATS_SERVICE } from 'src/config';
import { of, throwError } from 'rxjs';
import { CurrentUser } from 'src/auth/interfaces/current-user.interface';
import { CreateNotificationDto } from './dto/create-notification.dto';

const mockClientProxy = {
  send: jest.fn(),
};

describe('NotificationsController', () => {
  let controller: NotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NATS_SERVICE,
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    jest.clearAllMocks();
  });

  const idDto = 'YYYY-YYYY';
  const dto: CreateNotificationDto = {
    userId: 'ZZZZ-ZZZZ',
    reminderId: 'XXXX-XXXX',
    title: 'test',
    message: 'message',
    isRead: false,
    sentAt: '2025-04-16 08:00',
  };
  const dtoResult = {
    id: idDto,
    ...dto,
  };

  test('createNotification - should call client.send with correct params', () => {
    mockClientProxy.send.mockReturnValue(of(dtoResult));

    const result = controller.createNotification(dto);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'create_notification' },
      dto,
    );
    expect(result).toBeInstanceOf(Object);
  });

  test('findById - should return notification when found', async () => {
    mockClientProxy.send.mockReturnValue(of(dtoResult));

    const result = await controller.findById(idDto);
    expect(result).toEqual(dtoResult);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'find_notification_by_id' },
      { id: idDto },
    );
  });

  test('findById - should throw RpcException on error', async () => {
    mockClientProxy.send.mockReturnValue(throwError(() => new Error('Error')));

    await expect(controller.findById(idDto)).rejects.toThrow(RpcException);
  });

  test('findAllNotifications - should call client.send with correct user and isRead', () => {
    const user: CurrentUser = {
      id: 'ZZZZ-ZZZZ',
      name: 'Test',
      email: 'test@test.com',
    };
    const body = { isRead: true };
    mockClientProxy.send.mockReturnValue(of([dtoResult]));

    const result = controller.findAllNotifications(user, body);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'find_all_notifications' },
      { userId: user.id, isRead: body.isRead },
    );
    expect(result).toBeInstanceOf(Object);
  });

  test('updateNotification - should update a notification', async () => {
    const body = { isRead: true };
    mockClientProxy.send.mockReturnValue(
      of({ ...dtoResult, isRead: body.isRead }),
    );

    const result = await controller.updateNotification(idDto, body);
    expect(result).toEqual({ ...dtoResult, ...body });
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'update_notification' },
      { id: idDto, isRead: body.isRead },
    );
  });

  test('updateNotification - should throw RpcException on error', async () => {
    mockClientProxy.send.mockReturnValue(
      throwError(() => new Error('Update Error')),
    );

    await expect(
      controller.updateNotification(idDto, { isRead: false }),
    ).rejects.toThrow(RpcException);
  });

  test('deleteNotification - should delete a notification', async () => {
    const deleteResult = { success: true };
    mockClientProxy.send.mockReturnValue(of(deleteResult));

    const result = await controller.deleteNotification(idDto);
    expect(result).toEqual(deleteResult);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'delete_notification' },
      { id: idDto },
    );
  });

  test('deleteNotification - should throw RpcException on error', async () => {
    mockClientProxy.send.mockReturnValue(
      throwError(() => new Error('Delete Error')),
    );

    await expect(controller.deleteNotification(idDto)).rejects.toThrow(
      RpcException,
    );
  });
});
