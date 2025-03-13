import { CreateReminderApplicationDto } from '../../dto/create-reminder.dto';
import { UpdateReminderApplicationDto } from '../../dto/update-reminder.dto';
import { ReminderModelApplication } from '../models/reminder.model';
//Reminder is T as generic
export interface ReminderApplicationRepository<
  Reminder extends ReminderModelApplication,
> {
  create(reminder: CreateReminderApplicationDto): Promise<Reminder>;
  update(id: string, reminder: UpdateReminderApplicationDto): Promise<Reminder>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Reminder | null>;
  findAll(): Promise<Reminder[]>;
}
