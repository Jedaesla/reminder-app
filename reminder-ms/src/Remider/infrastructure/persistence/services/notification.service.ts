import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationInfraDto } from '../../dto/create-notification.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NotificationDomainService } from 'src/Remider/domain/services/notification.service';

@Injectable()
export class NotificationService implements NotificationDomainService {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}
  async createNotification(
    createNotification: CreateNotificationInfraDto,
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.client.send({ cmd: 'create_notification' }, createNotification),
      );
    } catch (error) {
      console.log('Error notification', error);
    }
  }
}
