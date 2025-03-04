import { Module } from '@nestjs/common';
import { ReminderController } from './reminders.controller';
import { NatsModule } from '../transports/nats.module';

@Module({
  controllers: [ReminderController],
  providers: [],
  imports: [NatsModule],
})
export class ReminderModule {}
