import { Test, TestingModule } from '@nestjs/testing';
import { NotificationRepository } from './notification.repository';
import { NotificationModelInfrastructure } from '../models/notification.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('NotificationRepository', () => {
  let repository: NotificationRepository;
  let repoMock: jest.Mocked<Repository<NotificationModelInfrastructure>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationRepository,
        {
          provide: getRepositoryToken(NotificationModelInfrastructure),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get(NotificationRepository);
    repoMock = module.get(getRepositoryToken(NotificationModelInfrastructure));
  });

  const dataInputNotification = {
    userId: 'XYZ-ABC',
    reminderId: 'AAA-BBB',
    title: 'Test Title',
    message: 'Test Message',
    sentAt: '2025-04-16 09:00',
    isRead: false,
  };
  const idNotification = '12345-67890';
  const complementData = {
    createdAt: new Date(),
    available: true,
  };

  const dataResponse = {
    id: idNotification,
    ...dataInputNotification,
    ...complementData,
  } as NotificationModelInfrastructure;

  test('should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('create - should call save with the correct data', async () => {
    repoMock.save.mockResolvedValue(dataResponse);

    const result = await repository.create(dataInputNotification);

    expect(repoMock.save).toHaveBeenCalled();
    expect(result).toEqual(dataResponse);
  });

  test('findById - should return a reminder if found', async () => {
    repoMock.findOne.mockResolvedValue(dataResponse);

    const result = await repository.findById(idNotification);
    expect(result).toEqual(dataResponse);
    expect(repoMock.findOne).toHaveBeenCalledWith({
      where: { id: idNotification, available: true },
    });
  });

  test('delete - should return true if reminder was deleted', async () => {
    repoMock.update.mockResolvedValue({ affected: 1 } as any);

    const result = await repository.delete(idNotification);
    expect(repoMock.update).toHaveBeenCalledWith(idNotification, {
      available: false,
    });
    expect(result).toBe(true);
  });

  test('delete - should throw error if not found row affected', async () => {
    repoMock.update.mockResolvedValue({ affected: 0 } as any);
    await expect(repository.delete('123')).rejects.toThrow(
      'Notification not found',
    );
  });

  test('findAll - should return all reminders', async () => {
    repoMock.find.mockResolvedValue([dataResponse]);

    const result = await repository.findAll(
      dataInputNotification.userId,
      dataInputNotification.isRead,
    );
    expect(repoMock.find).toHaveBeenCalledWith({
      where: {
        available: true,
        userId: dataInputNotification.userId,
        isRead: dataInputNotification.isRead,
      },
    });
    expect(result).toEqual([dataResponse]);
  });

  test('update - should return updated reminder if result is true', async () => {
    repoMock.findOne.mockResolvedValue(dataResponse);
    repoMock.save.mockResolvedValue(dataResponse);
    await repository.update(idNotification, true);
    expect(repoMock.save).toHaveBeenCalledTimes(1);
  });
});
