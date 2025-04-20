import { ReminderModelInfrastructure } from './reminder.model';

describe('ReminderModelInfrastructure', () => {
  test('should create an instance with default values', () => {
    const reminder = new ReminderModelInfrastructure();
    expect(reminder).toBeDefined();
  });

  test('should allow setting all fields', () => {
    const reminder = new ReminderModelInfrastructure();
    const now = new Date();
    reminder.id = 'ABCe4567-e89b-12d3-a456-426614174000';
    reminder.userId = 'ABC-DEF';
    reminder.title = 'Test title';
    reminder.description = 'Test description';
    reminder.reminderDateTime = '2025-04-14 08:00';
    reminder.isCompleted = true;
    reminder.createdAt = now;
    reminder.updatedAt = now;
    reminder.available = false;

    expect(reminder.id).toBe('ABCe4567-e89b-12d3-a456-426614174000');
    expect(reminder.userId).toBe('ABC-DEF');
    expect(reminder.title).toBe('Test title');
    expect(reminder.description).toBe('Test description');
    expect(reminder.reminderDateTime).toBe('2025-04-14 08:00');
    expect(reminder.isCompleted).toBe(true);
    expect(reminder.createdAt).toBe(now);
    expect(reminder.updatedAt).toBe(now);
    expect(reminder.available).toBe(false);
  });
});
