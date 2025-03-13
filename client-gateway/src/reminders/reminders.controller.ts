import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { UpdateReminderDto } from './dto/update-reminder.dto';

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

  @Get()
  findAllReminders() {
    return this.client.send({ cmd: 'find_all_reminders' }, {});
  }

  @Patch(':id')
  async updateReminder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRemiderDto: UpdateReminderDto,
  ) {
    try {
      const reminder = await firstValueFrom(
        this.client.send(
          { cmd: 'update_reminder' },
          { id, ...updateRemiderDto },
        ),
      );
      return reminder;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteReminder(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const reminder = await firstValueFrom(
        this.client.send({ cmd: 'delete_reminder' }, { id }),
      );
      return reminder;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
