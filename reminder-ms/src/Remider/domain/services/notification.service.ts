import { CreateNotificationDomainDto } from '../dto/create-notification.dto';

export interface NotificationDomainService {
  createNotification(
    createNotification: CreateNotificationDomainDto,
  ): Promise<void>;
}
