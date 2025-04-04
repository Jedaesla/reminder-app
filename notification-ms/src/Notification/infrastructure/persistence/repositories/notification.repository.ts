import { NotificationModelInfrastructure } from '../models/notification.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationApplicationRepository } from 'src/Notification/application/persistence/repositories/notification.repository';
import { CreateNotificationApplicationDto } from 'src/Notification/application/dto/create-notification.dto';

@Injectable()
export class NotificationRepository
  implements NotificationApplicationRepository<NotificationModelInfrastructure>
{
  constructor(
    @InjectRepository(NotificationModelInfrastructure)
    readonly repository: Repository<NotificationModelInfrastructure>,
  ) {}

  async create(
    notification: CreateNotificationApplicationDto,
  ): Promise<NotificationModelInfrastructure> {
    const data = this.mapApplicationDtoToUserModel(notification);
    return this.repository.save(data);
  }

  async update(
    id: string,
    isRead: boolean,
  ): Promise<NotificationModelInfrastructure> {
    const notificationResult = await this.findById(id);
    if (!notificationResult) {
      throw new Error('Notification not found');
    }
    const dataUpdate = {
      ...notificationResult,
      isRead,
    };

    return await this.repository.save(dataUpdate);
  }

  async delete(id: string): Promise<boolean> {
    const notificationUpdate = await this.repository.update(id, {
      available: false,
    });
    if (notificationUpdate.affected === 0) {
      throw new Error('Notification not found');
    }
    return true;
  }

  async findById(id: string): Promise<NotificationModelInfrastructure | null> {
    return await this.repository.findOne({
      where: {
        id,
        available: true,
      },
    });
  }

  async findAll(
    userId: string,
    isRead: boolean,
  ): Promise<NotificationModelInfrastructure[]> {
    return this.repository.find({ where: { available: true, userId, isRead } });
  }

  private mapApplicationDtoToUserModel(
    data: CreateNotificationApplicationDto,
  ): NotificationModelInfrastructure {
    const notification = new NotificationModelInfrastructure();
    notification.userId = data.userId;
    notification.reminderId = data.reminderId;
    notification.title = data.title;
    notification.message = data.message;
    notification.isRead = data.isRead;
    notification.sentAt = data.sentAt;
    return notification;
  }
}
