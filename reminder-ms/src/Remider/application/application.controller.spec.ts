import { ApplicationController } from './application.controller';
import { ReminderApplicationRepository } from './persistence/repositories/reminder.repository';
import { ReminderModelApplication } from './persistence/models/reminder.model';
import { Domain } from '../domain/domain.interface';
import { UuidDomainService } from '../domain/services/uuid.service';
import { NotificationDomainService } from '../domain/services/notification.service';
import { ReminderApplicationDto } from './dto/reminder.dto';
import { UpdateReminderApplicationDto } from './dto/update-reminder.dto';
import { CreateReminderUseCase } from './use-cases/create-reminder';
import { DeleteReminderUseCase } from './use-cases/delete-reminder';
import { FindAllRemindersUseCase } from './use-cases/findAll-reminders';
import { FindReminderByIdUseCase } from './use-cases/findById-reminder';
import { UpdateReminderUseCase } from './use-cases/update-reminder';

jest.mock('./use-cases/create-reminder');
jest.mock('./use-cases/delete-reminder');
jest.mock('./use-cases/findAll-reminders');
jest.mock('./use-cases/findById-reminder');
jest.mock('./use-cases/update-reminder');

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let repo: jest.Mocked<
    ReminderApplicationRepository<ReminderModelApplication>
  >;
  let domain: jest.Mocked<Domain>;
  let uuidService: jest.Mocked<UuidDomainService>;
  let notificationService: jest.Mocked<NotificationDomainService>;

  beforeEach(() => {
    repo = { findById: jest.fn(), findAll: jest.fn() } as any;
    domain = {} as any;
    uuidService = { generateUuid: jest.fn(), validateUuid: jest.fn() } as any;
    notificationService = { createNotificaiton: jest.fn() } as any;

    controller = new ApplicationController(repo, domain);
  });

  const dataReminder: ReminderApplicationDto = {
    id: 'ABC-DEF',
    userId: 'XYZ-123',
    title: 'Test',
    description: 'Description',
    reminderDateTime: '2025-01-01 08:00',
    isCompleted: false,
  };

  test('should create a reminder', async () => {
    (CreateReminderUseCase.prototype.execute as jest.Mock).mockResolvedValue(
      dataReminder,
    );

    const result = await controller.createReminder(
      'XYZ-123',
      'Test',
      'Description',
      '2025-01-01 08:00',
      false,
      uuidService,
      notificationService,
    );
    expect(result).toEqual(dataReminder);
  });

  test('should find reminder by id', async () => {
    (FindReminderByIdUseCase.prototype.execute as jest.Mock).mockResolvedValue(
      dataReminder,
    );
    const result = await controller.findReminderById(dataReminder.id);
    expect(result).toEqual(dataReminder);
  });

  test('should find all reminders', async () => {
    (FindAllRemindersUseCase.prototype.execute as jest.Mock).mockResolvedValue([
      dataReminder,
    ]);

    const result = await controller.findAllReminders('XYZ-123');
    expect(result).toEqual([dataReminder]);
  });

  test('should update a reminder', async () => {
    const updateDto = { title: 'Updated' } as UpdateReminderApplicationDto;
    (UpdateReminderUseCase.prototype.execute as jest.Mock).mockResolvedValue({
      ...dataReminder,
      ...updateDto,
    });

    const result = await controller.updateReminder(dataReminder.id, updateDto);
    expect(result).toEqual({ ...dataReminder, ...updateDto });
  });

  test('should delete a reminder', async () => {
    (DeleteReminderUseCase.prototype.execute as jest.Mock).mockResolvedValue(
      true,
    );
    const result = await controller.deleteRemider(dataReminder.id);
    expect(result).toBe(true);
  });
});
