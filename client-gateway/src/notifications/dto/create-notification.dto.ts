import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  public userId: string;

  @IsString()
  public reminderId: string;

  @IsString()
  public title: string;

  @IsString()
  public message: string;

  @IsBoolean()
  @IsOptional()
  public isRead: boolean = false;

  @IsString()
  public sentAt: string;
}
