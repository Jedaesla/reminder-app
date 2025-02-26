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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date | null;
}
