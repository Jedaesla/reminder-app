import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserModelInfrastructure } from '../models/user.model';
import { CreateUserApplicationDto } from 'src/Auth/application/dto/create-user.dto';

describe('UserRepository', () => {
  let repository: UserRepository;
  let typeOrmRepo: jest.Mocked<Repository<UserModelInfrastructure>>;

  const mockUser: CreateUserApplicationDto = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'securepassword',
  };

  const userResponse: UserModelInfrastructure = {
    ...mockUser,
    id: 'XXXX-XXXX',
    isActive: true,
    createdAt: new Date(),
    updatedAt: null,
  };

  beforeEach(async () => {
    const repoMock: Partial<Repository<UserModelInfrastructure>> = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserModelInfrastructure),
          useValue: repoMock,
        },
      ],
    }).compile();

    repository = module.get(UserRepository);
    typeOrmRepo = module.get(getRepositoryToken(UserModelInfrastructure));
  });

  test('findByEmail - should return user if found by email', async () => {
    typeOrmRepo.findOne.mockResolvedValue(userResponse);
    const result = await repository.findByEmail(mockUser.email);
    expect(typeOrmRepo.findOne).toHaveBeenCalledWith({
      where: { email: mockUser.email, isActive: true },
    });
    expect(result).toEqual(userResponse);
  });

  test('should return null if no user is found', async () => {
    typeOrmRepo.findOne.mockResolvedValue(null);
    const result = await repository.findByEmail(mockUser.email);
    expect(result).toBeNull();
  });

  test('create - should throw error if email is already registered', async () => {
    jest.spyOn(repository, 'findByEmail').mockResolvedValue(userResponse);

    await expect(repository.create(mockUser)).rejects.toThrow(
      'The email already has a registered account',
    );
  });

  test('create - should save and return user if email is not registered', async () => {
    jest.spyOn(repository, 'findByEmail').mockResolvedValue(null);
    typeOrmRepo.save.mockResolvedValue(userResponse);
    const result = await repository.create(mockUser);

    expect(repository.findByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(typeOrmRepo.save).toHaveBeenCalledWith(
      expect.objectContaining(mockUser),
    );
    expect(result).toEqual(userResponse);
  });
});
