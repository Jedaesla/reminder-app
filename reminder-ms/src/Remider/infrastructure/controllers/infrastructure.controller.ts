import { Controller } from '@nestjs/common';
import { ApplicationInterface } from 'src/Remider/application/application.interface';
import { UuidService } from '../persistence/services/uuid.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('reminder')
export class InfrastructureController {
  constructor(
    private readonly application: ApplicationInterface,
    private readonly uuidService: UuidService,
  ) {}

  @MessagePattern({ cmd: 'create_reminder' })
  async create(
    @Payload()
    body: {
      title: string;
      description: string;
      reminderDateTime: string;
      isCompleted: boolean;
    },
  ) {
    try {
      const data = await this.application.createReminder(
        body.title,
        body.description,
        body.reminderDateTime,
        body.isCompleted,
        this.uuidService,
      );
      return data;
    } catch (error) {
      console.log('error -> ', error);
    }
  }
}
