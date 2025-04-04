import { UuidDomainService } from '../domain/services/uuid.service';
import { CreateNotificationApplicationDto } from './dto/create-notification.dto';
import { NotificationApplicationDto } from './dto/notification.dto';

export abstract class ApplicationInterface {
  abstract createNotification(
    notificationData: CreateNotificationApplicationDto,
    uuidService: UuidDomainService,
  ): Promise<NotificationApplicationDto>;
  abstract findNotificationById(
    id: string,
  ): Promise<NotificationApplicationDto>;
  abstract findAllNotifications(
    userId: string,
    isRead: boolean,
  ): Promise<NotificationApplicationDto[]>;
  abstract updateNotification(
    id: string,
    isRead: boolean,
  ): Promise<NotificationApplicationDto>;
  abstract deleteNotification(id: string): Promise<boolean>;
}
