import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('reminders')
export class ReminderController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createReminder(@Body() createReminderDto: CreateReminderDto) {
    return this.client.send({ cmd: 'create_reminder' }, createReminderDto);
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const reminder = await firstValueFrom(
        this.client.send({ cmd: 'find_reminder_by_id' }, { id }),
      );
      return reminder;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
