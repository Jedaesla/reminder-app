import { Module } from '@nestjs/common';
import { ReminderModule } from './reminders/reminders.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ReminderModule, NatsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
