import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  controllers: [NotificationsController],
  providers: [],
  imports: [NatsModule],
})
export class NotificationModule {}
