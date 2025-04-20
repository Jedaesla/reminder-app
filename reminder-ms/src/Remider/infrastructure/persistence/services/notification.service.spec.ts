import { NotificationService } from './notification.service';
import { ClientProxy } from '@nestjs/microservices';
import { of, throwError } from 'rxjs';
import { CreateNotificationInfraDto } from '../../dto/create-notification.dto';

describe('NotificationService', () => {
  let service: NotificationService;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(() => {
    clientProxyMock = {
      send: jest.fn(),
    } as any;

    service = new NotificationService(clientProxyMock);
  });

  const dataNotification: CreateNotificationInfraDto = {
    userId: 'ABC-123',
    reminderId: '123-456',
    title: 'Test title',
    message: 'Test description',
    isRead: false,
    sentAt: '2025-01-01 08:00',
  };

  test('should send create_notification command via NATS', async () => {
    clientProxyMock.send.mockReturnValue(of(null));

    await expect(
      service.createNotification(dataNotification),
    ).resolves.toBeUndefined();

    expect(clientProxyMock.send).toHaveBeenCalledWith(
      { cmd: 'create_notification' },
      dataNotification,
    );
  });

  test('should catch and log errors if sending fails', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    clientProxyMock.send.mockReturnValue(
      throwError(() => new Error('NATS error')),
    );

    await expect(
      service.createNotification(dataNotification),
    ).resolves.toBeUndefined();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error notification',
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
