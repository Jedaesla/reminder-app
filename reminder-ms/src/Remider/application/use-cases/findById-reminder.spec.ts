import { UseCaseException } from '../exceptions/use-case.exception';
import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { FindReminderByIdUseCase } from './findById-reminder';

describe('FindReminderByIdUseCase', () => {
  let useCase: FindReminderByIdUseCase;
  const idReminder = 'ABCD-EFGH';
  const dataReminder: ReminderModelApplication = {
    userId: 'ABC-DEF',
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
    findById: jest.fn(),
  };

  beforeEach(() => {
    useCase = new FindReminderByIdUseCase(reminderRepoMock as any);
    jest.clearAllMocks();
  });

  test('debería listar el reminder solicitado por el usuario correctamente', async () => {
    reminderRepoMock.findById.mockResolvedValue(dataReminder);

    const result = await useCase.execute(idReminder);
    expect(reminderRepoMock.findById).toHaveBeenCalledWith(idReminder);

    expect(result).toEqual({
      userId: 'ABC-DEF',
      id: idReminder,
      title: 'Test',
      description: 'Test description',
      reminderDateTime: '2025-02-03 08:00',
      isCompleted: false,
    });
  });
  test('debería disparar la excepcion sino encuentra el reminder', async () => {
    reminderRepoMock.findById.mockResolvedValue(null);

    await expect(useCase.execute(idReminder)).rejects.toThrow(UseCaseException);
    expect(reminderRepoMock.findById).toHaveBeenCalledWith(idReminder);
  });
});
