import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public reminderDateTime: string;

  @IsBoolean()
  @IsOptional()
  public isCompleted: boolean = false;
}
