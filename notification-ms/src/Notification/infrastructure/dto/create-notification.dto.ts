import { IsBoolean, IsString } from 'class-validator';

export class CreateNotificationInfraDto {
  @IsString()
  userId: string;
  @IsString()
  reminderId: string;
  @IsString()
  title: string;
  @IsString()
  message: string;
  @IsBoolean()
  isRead: boolean;
  @IsString()
  sentAt: string;
}
