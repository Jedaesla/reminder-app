import { CreateReminderApplicationDto } from '../../dto/create-user.dto';
import { UpdateReminderApplicationDto } from '../../dto/update-user.dto';
import { ReminderModel } from '../models/reminder.model';
//Reminder is T as generic
export interface ReminderApplicationRepository<Reminder extends ReminderModel> {
  create(reminder: CreateReminderApplicationDto): Promise<Reminder>;
  update(reminder: UpdateReminderApplicationDto): Promise<Reminder>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Reminder | null>;
  findAll(): Promise<Reminder[]>;
}
