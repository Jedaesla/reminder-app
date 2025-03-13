import { IsBoolean, IsString } from 'class-validator';

export class CreateReminderInfraDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  reminderDateTime: string;
  @IsBoolean()
  isCompleted: boolean;
}
