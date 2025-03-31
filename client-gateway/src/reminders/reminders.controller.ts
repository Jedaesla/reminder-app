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
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { CurrentUser } from 'src/auth/interfaces/current-user.interface';

@UseGuards(AuthGuard)
@Controller('reminders')
export class ReminderController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createReminder(
    @User() user: CurrentUser,
    @Body() createReminderDto: CreateReminderDto,
  ) {
    return this.client.send(
      { cmd: 'create_reminder' },
      { userId: user.id, ...createReminderDto },
    );
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
  findAllReminders(@User() user: CurrentUser) {
    return this.client.send({ cmd: 'find_all_reminders' }, { userId: user.id });
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
