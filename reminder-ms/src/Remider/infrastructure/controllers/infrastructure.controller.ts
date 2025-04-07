import { Controller, Logger, ParseUUIDPipe } from '@nestjs/common';
import { ApplicationInterface } from 'src/Remider/application/application.interface';
import { UuidService } from '../persistence/services/uuid.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UpdateReminderInfraDto } from '../dto/update-reminder.dto';
import { NotificationService } from '../persistence/services/notification.service';

@Controller('reminder')
export class InfrastructureController {
  private readonly logger = new Logger('Logger en infra');
  constructor(
    private readonly application: ApplicationInterface,
    private readonly uuidService: UuidService,
    private readonly notificationService: NotificationService,
  ) {}

  @MessagePattern({ cmd: 'create_reminder' })
  async create(
    @Payload()
    body: {
      userId: string;
      title: string;
      description: string;
      reminderDateTime: string;
      isCompleted: boolean;
    },
  ) {
    try {
      const data = await this.application.createReminder(
        body.userId,
        body.title,
        body.description,
        body.reminderDateTime,
        body.isCompleted,
        this.uuidService,
        this.notificationService,
      );
      return data;
    } catch (error) {
      console.log('error -> ', error);
    }
  }

  @MessagePattern({ cmd: 'find_reminder_by_id' })
  async findById(@Payload('id', ParseUUIDPipe) id: string) {
    try {
      const reminder = await this.application.findReminderById(id);
      return reminder;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find_all_reminders' })
  async findAll(@Payload() body: { userId: string }) {
    try {
      const reminders = await this.application.findAllReminders(body.userId);
      return reminders;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'update_reminder' })
  async update(@Payload() updateReminder: UpdateReminderInfraDto) {
    try {
      const reminder = await this.application.updateReminder(
        updateReminder.id,
        updateReminder,
      );
      return reminder;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'delete_reminder' })
  async delete(@Payload('id', ParseUUIDPipe) id: string) {
    try {
      const reminder = await this.application.deleteRemider(id);
      return reminder;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
