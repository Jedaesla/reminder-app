import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { FindAllRemindersUseCase } from './findAll-reminders';

describe('FindAllRemindersUseCase', () => {
  let useCase: FindAllRemindersUseCase;
  const userId = 'ABCD-EFGH';
  const dataReminders: ReminderModelApplication[] = [
    {
      userId,
      id: '12345-67890',
      title: 'Test',
      description: 'Test description',
      reminderDateTime: '2025-02-03 08:00',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: null,
      available: true,
    },
  ];
  const reminderRepoMock = {
    findAll: jest.fn(),
  };

  beforeEach(() => {
    useCase = new FindAllRemindersUseCase(reminderRepoMock as any);
    jest.clearAllMocks();
  });

  test('debería listar todos los reminders de un usuario correctamente', async () => {
    reminderRepoMock.findAll.mockResolvedValue(dataReminders);

    const result = await useCase.execute({ userId });
    expect(reminderRepoMock.findAll).toHaveBeenCalledWith(userId);

    expect(result).toEqual([
      {
        userId,
        id: '12345-67890',
        title: 'Test',
        description: 'Test description',
        reminderDateTime: '2025-02-03 08:00',
        isCompleted: false,
      },
    ]);
  });
});
