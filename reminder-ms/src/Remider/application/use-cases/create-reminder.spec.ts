import { CreateReminderUseCase } from './create-reminder';
import { CreateReminderApplicationDto } from '../dto/create-reminder.dto';
import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { ReminderDomainDto } from 'src/Remider/domain/dto/reminder.dto';

describe('CreateReminderUseCase', () => {
  let useCase: CreateReminderUseCase;

  const reminderRepoMock = {
    create: jest.fn(),
  };

  const domainMock = {
    createReminder: jest.fn(),
  };

  const uuidServiceMock = {
    generate: jest.fn(),
  };

  const notificationServiceMock = {
    createNotification: jest.fn(),
  };

  beforeEach(() => {
    useCase = new CreateReminderUseCase(
      reminderRepoMock as any,
      domainMock as any,
      uuidServiceMock as any,
      notificationServiceMock as any,
    );
    jest.clearAllMocks();
  });

  test('debería crear un reminder y enviar una notificación', async () => {
    const inputDto: CreateReminderApplicationDto = {
      userId: '1',
      title: 'Test',
      description: 'Test description',
      reminderDateTime: '1991-08-06',
      isCompleted: false,
    };

    const domainReminder: ReminderDomainDto = {
      id: 'abc123',
      ...inputDto,
    };

    const savedReminder: ReminderModelApplication = {
      ...domainReminder,
      createdAt: new Date(),
      updatedAt: null,
      available: true,
    };

    domainMock.createReminder.mockReturnValue(domainReminder);
    reminderRepoMock.create.mockResolvedValue(savedReminder);

    const result = await useCase.execute(inputDto);

    expect(domainMock.createReminder).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: '1',
        title: 'Test',
      }),
      uuidServiceMock,
    );

    expect(reminderRepoMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'abc123',
        userId: '1',
        title: 'Test',
      }),
    );

    expect(notificationServiceMock.createNotification).toHaveBeenCalledWith({
      userId: '1',
      reminderId: 'abc123',
      title: 'Test',
      message: 'Test description',
      sentAt: inputDto.reminderDateTime,
      isRead: false,
    });

    expect(result).toEqual({
      userId: '1',
      id: 'abc123',
      title: 'Test',
      description: 'Test description',
      reminderDateTime: inputDto.reminderDateTime,
      isCompleted: false,
    });
  });
});
