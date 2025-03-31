export interface ReminderModelApplication {
  id: string;
  userId: string;
  title: string;
  description: string;
  reminderDateTime: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  available: boolean;
}
