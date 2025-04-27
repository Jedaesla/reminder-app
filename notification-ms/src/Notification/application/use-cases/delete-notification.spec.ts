import { DeleteNotificationUseCase } from './delete-notification';

describe('DeleteNotificationUseCase', () => {
  let useCase: DeleteNotificationUseCase;
  const idDelete = '1234-5678';
  const notificationRepoMock = {
    delete: jest.fn(),
  };

  beforeEach(() => {
    useCase = new DeleteNotificationUseCase(notificationRepoMock as any);
    jest.clearAllMocks();
  });

  test('should delete a notification successfully', async () => {
    notificationRepoMock.delete.mockResolvedValue(true);

    const result = await useCase.execute(idDelete);
    expect(notificationRepoMock.delete).toHaveBeenCalledWith(idDelete);

    expect(result).toBe(true);
  });
});
