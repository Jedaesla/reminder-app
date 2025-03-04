import { Module } from '@nestjs/common';
import { ReminderModule } from './reminders/reminders.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [ReminderModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
