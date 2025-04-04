import { CreateNotificationDomainDto } from './dto/create-notification.dto';
import { NotificationDomainDto } from './dto/notification.dto';
import { UuidDomainService } from './services/uuid.service';

export abstract class Domain {
  abstract createNotification(
    data: CreateNotificationDomainDto,
    uuidService: UuidDomainService,
  ): NotificationDomainDto;
}
