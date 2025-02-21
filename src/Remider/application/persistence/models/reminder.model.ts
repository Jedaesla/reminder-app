export interface ReminderModel {
  id: string;
  title: string;
  description: string;
  reminderDateTime: string;
  isCompleted: boolean;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
