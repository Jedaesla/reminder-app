import { CreateNotificationApplicationDto } from '../../dto/create-notification.dto';
import { NotificationModelApplication } from '../models/notification.model';
//Notification is T as generic
export interface NotificationApplicationRepository<
  Notification extends NotificationModelApplication,
> {
  create(notification: CreateNotificationApplicationDto): Promise<Notification>;
  update(id: string, isRead: boolean): Promise<Notification>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Notification | null>;
  findAll(userId: string, isRead: boolean): Promise<Notification[]>;
}
