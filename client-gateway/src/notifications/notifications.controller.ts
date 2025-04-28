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
import { CreateNotificationDto } from './dto/create-notification.dto';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { CurrentUser } from 'src/auth/interfaces/current-user.interface';

@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.client.send(
      { cmd: 'create_notification' },
      createNotificationDto,
    );
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const notification = await firstValueFrom(
        this.client.send({ cmd: 'find_notification_by_id' }, { id }),
      );
      return notification;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllNotifications(
    @User() user: CurrentUser,
    @Body() body: { isRead: boolean },
  ) {
    return this.client.send(
      { cmd: 'find_all_notifications' },
      { userId: user.id, isRead: body.isRead },
    );
  }

  @Patch(':id')
  async updateNotification(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { isRead: boolean },
  ) {
    try {
      const notification = await firstValueFrom(
        this.client.send(
          { cmd: 'update_notification' },
          { id, isRead: body.isRead },
        ),
      );
      return notification;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteNotification(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const notification = await firstValueFrom(
        this.client.send({ cmd: 'delete_notification' }, { id }),
      );
      return notification;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
