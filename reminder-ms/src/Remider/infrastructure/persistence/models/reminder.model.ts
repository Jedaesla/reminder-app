import { ReminderModelApplication } from 'src/Remider/application/persistence/models/reminder.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Reminders' })
export class ReminderModelInfrastructure implements ReminderModelApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  reminderDateTime: string;

  @Column({ type: 'bool', default: false })
  isCompleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'bool', default: true })
  available: boolean;
}
