import { PartialType } from '@nestjs/mapped-types';
import { CreateReminderInfraDto } from './create-reminder.dto';
import { IsString } from 'class-validator';
export class UpdateReminderInfraDto extends PartialType(
  CreateReminderInfraDto,
) {
  @IsString()
  id: string;
}
