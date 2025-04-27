import { CreateNotificationDomainDto } from 'src/Notification/domain/dto/create-notification.dto';
import { CreateNotificationApplicationDto } from '../dto/create-notification.dto';
import { NotificationApplicationDto } from '../dto/notification.dto';
import { NotificationModelApplication } from '../persistence/models/notification.model';
import { NotificationDomainDto } from 'src/Notification/domain/dto/notification.dto';

export class NotificationMapApplication {
  static toApplicationDto(
    notificationDto: NotificationModelApplication,
  ): NotificationApplicationDto {
    return {
      id: notificationDto.id,
      userId: notificationDto.userId,
      reminderId: notificationDto.reminderId,
      title: notificationDto.title,
      message: notificationDto.message,
      isRead: notificationDto.isRead,
      sentAt: notificationDto.sentAt,
    };
  }
  static toDomainDto(
    notificationDto: CreateNotificationApplicationDto,
  ): CreateNotificationDomainDto {
    return {
      userId: notificationDto.userId,
      reminderId: notificationDto.reminderId,
      title: notificationDto.title,
      message: notificationDto.message,
      isRead: notificationDto.isRead,
      sentAt: notificationDto.sentAt,
    };
  }
  static toPersistenceDto(
    notificationDto: NotificationDomainDto,
  ): NotificationApplicationDto {
    return {
      id: notificationDto.id,
      userId: notificationDto.userId,
      reminderId: notificationDto.reminderId,
      title: notificationDto.title,
      message: notificationDto.message,
      isRead: notificationDto.isRead,
      sentAt: notificationDto.sentAt,
    };
  }
}
