import { Domain } from './domain.interface';
import { CreateNotificationDomainDto } from './dto/create-notification.dto';
import { NotificationDomainDto } from './dto/notification.dto';
import { NotificationEntity } from './entitites/notification.entity';
import { InvalidDataException } from './exceptions/invalid-data.exception';
import { UuidDomainService } from './services/uuid.service';

export class DomainController extends Domain {
  createNotification(
    data: CreateNotificationDomainDto,
    uuidService: UuidDomainService,
  ): NotificationDomainDto {
    const notification = new NotificationEntity(uuidService);
    notification.create(data);

    if (notification.isValid() === false) {
      throw new InvalidDataException(
        'Invalid creation by notification data',
        notification.getErrors(),
      );
    }
    return notification;
  }
}
