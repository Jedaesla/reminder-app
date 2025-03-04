import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Controller('reminders')
export class ReminderController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createReminder(@Body() createReminderDto: CreateReminderDto) {
    return this.client.send({ cmd: 'create_reminder' }, createReminderDto);
  }
}
