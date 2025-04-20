import { Test, TestingModule } from '@nestjs/testing';
import { InfrastructureController } from './infrastructure.controller';
import { ApplicationInterface } from 'src/Remider/application/application.interface';
import { UuidService } from '../persistence/services/uuid.service';
import { NotificationService } from '../persistence/services/notification.service';
import { RpcException } from '@nestjs/microservices';

const dataInputReminder = {
  userId: '12345',
  title: 'test',
  description: 'description',
  reminderDateTime: '2008-10-11',
  isCompleted: false,
};
const reminderId = '12345-67890';

describe('InfrastructureController', () => {
  let controller: InfrastructureController;
  let mockApplication: jest.Mocked<ApplicationInterface>;

  beforeEach(async () => {
    mockApplication = {
      createReminder: jest.fn(),
      findReminderById: jest.fn(),
      findAllReminders: jest.fn(),
      updateReminder: jest.fn(),
      deleteRemider: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfrastructureController],
      providers: [
        { provide: ApplicationInterface, useValue: mockApplication },
        { provide: UuidService, useValue: {} },
        { provide: NotificationService, useValue: {} },
      ],
    }).compile();

    controller = module.get<InfrastructureController>(InfrastructureController);
  });

  test('should create a reminder', async () => {
    mockApplication.createReminder.mockResolvedValue({
      id: '12345-67890',
      ...dataInputReminder,
    });

    const result = await controller.create(dataInputReminder);

    expect(mockApplication.createReminder).toHaveBeenCalledWith(
      dataInputReminder.userId,
      dataInputReminder.title,
      dataInputReminder.description,
      dataInputReminder.reminderDateTime,
      dataInputReminder.isCompleted,
      {}, // mock del uuidService
      {}, // mock del notificationService
    );

    expect(result).toEqual({ id: '12345-67890', ...dataInputReminder });
  });

  test('should find a reminder by ID', async () => {
    const dataResult = { id: reminderId, ...dataInputReminder };
    mockApplication.findReminderById.mockResolvedValue(dataResult);

    const result = await controller.findById(reminderId);

    expect(mockApplication.findReminderById).toHaveBeenCalledWith(reminderId);
    expect(result).toEqual(dataResult);
  });

  test('should throw RpcException error in findById', async () => {
    mockApplication.findReminderById.mockRejectedValue(new Error('Not found'));
    await expect(controller.findById(reminderId)).rejects.toThrow(RpcException);
  });

  test('should find all reminders for a user', async () => {
    const reminders = [
      { ...dataInputReminder, id: '1' },
      { ...dataInputReminder, id: '2' },
    ];
    mockApplication.findAllReminders.mockResolvedValue(reminders);

    const result = await controller.findAll({ userId: 'ABCDE-FGHIJ' });

    expect(mockApplication.findAllReminders).toHaveBeenCalledWith(
      'ABCDE-FGHIJ',
    );
    expect(result).toEqual(reminders);
  });

  test('should update a reminder', async () => {
    const dataToUpdated = {
      description: 'description updated',
    };
    const dataResolve = {
      id: reminderId,
      ...dataInputReminder,
      ...dataToUpdated,
    };
    mockApplication.updateReminder.mockResolvedValue(dataResolve);

    const result = await controller.update({
      id: reminderId,
      ...dataToUpdated,
    });

    expect(mockApplication.updateReminder).toHaveBeenCalledWith(reminderId, {
      id: reminderId,
      ...dataToUpdated,
    });
    expect(result).toEqual(dataResolve);
  });

  test('should delete a reminder', async () => {
    mockApplication.deleteRemider.mockResolvedValue(true);
    const result = await controller.delete(reminderId);

    expect(mockApplication.deleteRemider).toHaveBeenCalledWith(reminderId);
    expect(result).toEqual(true);
  });
});
