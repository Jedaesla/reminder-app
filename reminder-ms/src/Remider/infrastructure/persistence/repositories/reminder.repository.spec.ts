import { Test, TestingModule } from '@nestjs/testing';
import { ReminderRepository } from './reminder.repository';
import { ReminderModelInfrastructure } from '../models/reminder.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ReminderRepository', () => {
  let repository: ReminderRepository;
  let repoMock: jest.Mocked<Repository<ReminderModelInfrastructure>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReminderRepository,
        {
          provide: getRepositoryToken(ReminderModelInfrastructure),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get(ReminderRepository);
    repoMock = module.get(getRepositoryToken(ReminderModelInfrastructure));
  });

  const idReminder = 'ABC-123';
  const dataReminder = {
    userId: 'ABC-DEF',
    title: 'Title',
    description: 'Description',
    reminderDateTime: '2025-04-14 08:00',
    isCompleted: false,
  };
  const complementData = {
    createdAt: new Date(),
    updatedAt: null,
    available: true,
  };

  const dataResponse = {
    id: idReminder,
    ...dataReminder,
    ...complementData,
  } as ReminderModelInfrastructure;

  test('should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('create - should call save with the correct data', async () => {
    repoMock.save.mockResolvedValue(dataResponse);

    const result = await repository.create(dataReminder);

    expect(repoMock.save).toHaveBeenCalled();
    expect(result).toEqual(dataResponse);
  });

  test('findById - should return a reminder if found', async () => {
    repoMock.findOne.mockResolvedValue(dataResponse);

    const result = await repository.findById(idReminder);
    expect(result).toEqual(dataResponse);
    expect(repoMock.findOne).toHaveBeenCalledWith({
      where: { id: idReminder, available: true },
    });
  });

  test('delete - should return true if reminder was deleted', async () => {
    repoMock.update.mockResolvedValue({ affected: 1 } as any);

    const result = await repository.delete(idReminder);
    expect(repoMock.update).toHaveBeenCalledWith(idReminder, {
      available: false,
    });
    expect(result).toBe(true);
  });

  test('delete - should throw error if not found row affected', async () => {
    repoMock.update.mockResolvedValue({ affected: 0 } as any);
    await expect(repository.delete('123')).rejects.toThrow(
      'Reminder not found',
    );
  });

  test('findAll - should return all reminders', async () => {
    repoMock.find.mockResolvedValue([dataResponse]);

    const result = await repository.findAll('userId');
    expect(repoMock.find).toHaveBeenCalledWith({
      where: { available: true, userId: 'userId' },
    });
    expect(result).toEqual([dataResponse]);
  });

  test('update - should return updated reminder if result is true', async () => {
    repoMock.findOne.mockResolvedValue(dataResponse);
    repoMock.save.mockResolvedValue(dataResponse);
    await repository.update(idReminder, dataResponse);
    expect(repoMock.save).toHaveBeenCalledTimes(1);
  });
});
