import { DomainController } from './domain.controller';
import { UuidDomainService } from './services/uuid.service';
import { PasswordHashDomainService } from './services/password-hash.service';
import { CreateUserDomainDto } from './dto/create-user.dto';
import { LoginUserDomainDto } from './dto/login-user.dto';
import { InvalidDataException } from './exceptions/invalid-data.exception';

describe('DomainController', () => {
  let controller: DomainController;
  let mockUuidService: UuidDomainService;
  let mockHashService: PasswordHashDomainService;

  beforeEach(() => {
    controller = new DomainController();

    mockUuidService = {
      generateUuid: jest.fn().mockReturnValue('uuid-123'),
      validateUuid: jest.fn().mockReturnValue(true),
    };

    mockHashService = {
      hash: jest.fn((value) => `hashed-${value}`),
      compare: jest.fn(),
    };
  });

  test('createUser - should create and return a valid user', () => {
    const dto: CreateUserDomainDto = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'Password123',
    };

    const result = controller.createUser(dto, mockUuidService, mockHashService);

    expect(result).toHaveProperty('id', 'uuid-123');
    expect(result).toHaveProperty('name', 'Alice');
    expect(result).toHaveProperty('email', 'alice@example.com');
    expect(result).toHaveProperty('password');
  });

  test('createUser - should throw InvalidDataException for invalid data', () => {
    const dto: CreateUserDomainDto = {
      name: '',
      email: 'invalid-email',
      password: 'weak',
    };

    expect(() =>
      controller.createUser(dto, mockUuidService, mockHashService),
    ).toThrow(InvalidDataException);
  });

  test('signIn - should return true for valid login', () => {
    const dto: LoginUserDomainDto = {
      email: 'bob@example.com',
      password: 'Password123',
    };

    mockHashService.hash = jest.fn(() => 'HashedValid123');
    const result = controller.signIn(dto, mockHashService);
    expect(result).toBe(true);
  });

  test('signIn - should throw InvalidDataException for invalid email or password', () => {
    const dto: LoginUserDomainDto = {
      email: 'bad-email',
      password: '123',
    };

    expect(() => controller.signIn(dto, mockHashService)).toThrow(
      InvalidDataException,
    );
  });
});
