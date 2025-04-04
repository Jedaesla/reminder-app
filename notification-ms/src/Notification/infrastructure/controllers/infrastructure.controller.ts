import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { UuidService } from '../persistence/services/uuid.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ApplicationInterface } from 'src/Notification/application/application.interface';
import { CreateNotificationInfraDto } from '../dto/create-notification.dto';

@Controller('notification')
export class InfrastructureController {
  constructor(
    private readonly application: ApplicationInterface,
    private readonly uuidService: UuidService,
  ) {}

  @MessagePattern({ cmd: 'create_notification' })
  async create(
    @Payload()
    notificationData: CreateNotificationInfraDto,
  ) {
    try {
      const data = await this.application.createNotification(
        notificationData,
        this.uuidService,
      );
      return data;
    } catch (error) {
      console.log('error create ->', error);
    }
  }

  @MessagePattern({ cmd: 'find_notification_by_id' })
  async findById(@Payload('id', ParseUUIDPipe) id: string) {
    try {
      const notification = await this.application.findNotificationById(id);
      return notification;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find_all_notifications' })
  async findAll(@Payload() body: { userId: string; isRead: boolean }) {
    try {
      const notifications = await this.application.findAllNotifications(
        body.userId,
        body.isRead,
      );
      return notifications;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'update_notification' })
  async update(@Payload() updateNotification: { id: string; isRead: boolean }) {
    try {
      const notification = await this.application.updateNotification(
        updateNotification.id,
        updateNotification.isRead,
      );
      return notification.isRead;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'delete_notification' })
  async delete(@Payload('id', ParseUUIDPipe) id: string) {
    try {
      const notification = await this.application.deleteNotification(id);
      return notification;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
