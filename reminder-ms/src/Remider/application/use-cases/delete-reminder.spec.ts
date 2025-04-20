import { DeleteReminderUseCase } from './delete-reminder';

describe('DeleteReminderUseCase', () => {
  let useCase: DeleteReminderUseCase;
  const idDelete = '1234-5678';
  const reminderRepoMock = {
    delete: jest.fn(),
  };

  beforeEach(() => {
    useCase = new DeleteReminderUseCase(reminderRepoMock as any);
    jest.clearAllMocks();
  });

  test('debería eliminar un reminder correctamente', async () => {
    reminderRepoMock.delete.mockResolvedValue(true);

    const result = await useCase.execute(idDelete);
    expect(reminderRepoMock.delete).toHaveBeenCalledWith(idDelete);

    expect(result).toBe(true);
  });
});
