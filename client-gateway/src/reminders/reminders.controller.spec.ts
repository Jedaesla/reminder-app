import { ReminderController } from './reminders.controller';
import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { NATS_SERVICE } from 'src/config';
import { of, throwError } from 'rxjs';
import { CurrentUser } from 'src/auth/interfaces/current-user.interface';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

const mockClientProxy = {
  send: jest.fn(),
};

describe('ReminderController', () => {
  let controller: ReminderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReminderController],
      providers: [
        {
          provide: NATS_SERVICE,
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    controller = module.get<ReminderController>(ReminderController);
    jest.clearAllMocks();
  });

  const idDto = 'YYYY-YYYY';
  const dto: CreateReminderDto = {
    title: 'test',
    description: 'description',
    reminderDateTime: '2025-04-16 08:00',
    isCompleted: false,
  };
  const dtoResult = {
    id: idDto,
    ...dto,
  };
  const user: CurrentUser = {
    id: 'ZZZZ-ZZZZ',
    name: 'Test',
    email: 'test@test.com',
  };

  test('createReminder - should call client.send with correct params', () => {
    mockClientProxy.send.mockReturnValue(of(dtoResult));

    const result = controller.createReminder(user, dto);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'create_reminder' },
      { userId: user.id, ...dto },
    );
    expect(result).toBeInstanceOf(Object);
  });

  test('findById - should return reminder when found', async () => {
    mockClientProxy.send.mockReturnValue(of(dtoResult));

    const result = await controller.findById(idDto);
    expect(result).toEqual(dtoResult);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'find_reminder_by_id' },
      { id: idDto },
    );
  });

  test('findById - should throw RpcException on error', async () => {
    mockClientProxy.send.mockReturnValue(throwError(() => new Error('Error')));

    await expect(controller.findById(idDto)).rejects.toThrow(RpcException);
  });

  test('findAllReminders - should call client.send with correct user', () => {
    mockClientProxy.send.mockReturnValue(of([dtoResult]));

    const result = controller.findAllReminders(user);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'find_all_reminders' },
      { userId: user.id },
    );
    expect(result).toBeInstanceOf(Object);
  });

  test('updateReminder - should update a reminder', async () => {
    const body: UpdateReminderDto = { ...dto, title: 'Title update' };
    mockClientProxy.send.mockReturnValue(of({ ...dtoResult, ...body }));

    const result = await controller.updateReminder(idDto, body);
    expect(result).toEqual({ ...dtoResult, ...body });
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'update_reminder' },
      { id: idDto, ...body },
    );
  });

  test('updateReminder - should throw RpcException on error', async () => {
    mockClientProxy.send.mockReturnValue(
      throwError(() => new Error('Update Error')),
    );

    await expect(
      controller.updateReminder(idDto, { title: 'Title update' }),
    ).rejects.toThrow(RpcException);
  });

  test('deleteReminder - should delete a reminder', async () => {
    const deleteResult = { success: true };
    mockClientProxy.send.mockReturnValue(of(deleteResult));

    const result = await controller.deleteReminder(idDto);
    expect(result).toEqual(deleteResult);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'delete_reminder' },
      { id: idDto },
    );
  });

  test('deleteReminder - should throw RpcException on error', async () => {
    mockClientProxy.send.mockReturnValue(
      throwError(() => new Error('Delete Error')),
    );

    await expect(controller.deleteReminder(idDto)).rejects.toThrow(
      RpcException,
    );
  });
});
