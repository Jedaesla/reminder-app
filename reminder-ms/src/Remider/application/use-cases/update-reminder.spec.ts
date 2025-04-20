import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { UpdateReminderUseCase } from './update-reminder';

describe('UpdateReminderUseCase', () => {
  let useCase: UpdateReminderUseCase;
  const idReminder = '12345-67890';
  const dataReminder: ReminderModelApplication = {
    userId: 'XYZ-123',
    id: idReminder,
    title: 'Test',
    description: 'Test description',
    reminderDateTime: '2025-02-03 08:00',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: null,
    available: true,
  };
  const reminderRepoMock = {
    update: jest.fn(),
  };

  beforeEach(() => {
    useCase = new UpdateReminderUseCase(reminderRepoMock as any);
    jest.clearAllMocks();
  });

  test('debería actualizar el reminder correctamente', async () => {
    reminderRepoMock.update.mockResolvedValue(dataReminder);

    const result = await useCase.execute(idReminder, dataReminder);
    expect(reminderRepoMock.update).toHaveBeenCalledWith(
      idReminder,
      dataReminder,
    );

    expect(result).toEqual({
      userId: 'XYZ-123',
      id: idReminder,
      title: 'Test',
      description: 'Test description',
      reminderDateTime: '2025-02-03 08:00',
      isCompleted: false,
    });
  });
});
