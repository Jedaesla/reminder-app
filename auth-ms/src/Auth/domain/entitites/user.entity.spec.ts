import { UserEntity } from './user.entity';
import { PasswordHashDomainService } from '../services/password-hash.service';
import { UuidDomainService } from '../services/uuid.service';
import { CreateUserDomainDto } from '../dto/create-user.dto';
import { LoginUserDomainDto } from '../dto/login-user.dto';

describe('UserEntity', () => {
  let userEntity: UserEntity;
  let mockHashService: PasswordHashDomainService;
  let mockUuidService: UuidDomainService;

  beforeEach(() => {
    mockHashService = {
      hash: jest.fn().mockImplementation((pass) => `hashed-${pass}`),
      compare: jest.fn(),
    };

    mockUuidService = {
      generateUuid: jest.fn().mockReturnValue('uuid-123'),
      validateUuid: jest.fn().mockReturnValue(true),
    };

    userEntity = new UserEntity(mockHashService);
  });

  test('create - should assign fields and hash password', () => {
    const dto: CreateUserDomainDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123',
    };

    const entity = userEntity.create(dto, mockUuidService);

    expect(entity.id).toBe('uuid-123');
    expect(entity.name).toBe(dto.name);
    expect(entity.email).toBe(dto.email);
    expect(entity.password).toBe('hashed-Password123');
    expect(entity.isValid()).toBe(true);
  });

  test('signIn - should hash password and validate email/password', () => {
    const dto: LoginUserDomainDto = {
      email: 'john@example.com',
      password: 'Password123',
    };

    const result = userEntity.signIn(dto);

    expect(result).toBe(true);
    expect(userEntity.email).toBe(dto.email);
    expect(userEntity.password).toBe('hashed-Password123');
  });

  test('signIn - should return false for invalid email', () => {
    const dto: LoginUserDomainDto = {
      email: 'no-email',
      password: 'Password123',
    };

    userEntity.signIn(dto);
    expect(userEntity.isValid()).toBe(false);
    expect(userEntity.getErrors().has('email')).toBe(true);
  });

  test('validate - should invalidate password', () => {
    userEntity.password = '123'; // pass no cumple con el regex
    userEntity.email = 'test@example.com';
    userEntity.name = 'John';
    userEntity.id = 'uuid-123';

    userEntity.validate(mockUuidService);

    expect(userEntity.getErrors().has('password')).toBe(true);
  });

  test('validate - should invalidate blank name', () => {
    userEntity.password = 'Password123';
    userEntity.email = 'test@example.com';
    userEntity.name = ' '; // Generar error por nombre vacio
    userEntity.id = 'uuid-123';

    userEntity.validate(mockUuidService);

    expect(userEntity.getErrors().has('name')).toBe(true);
  });

  test('should return error map and correct validity', () => {
    userEntity.password = '1234';
    userEntity.email = 'invalid-email';
    userEntity.name = '';
    userEntity.id = 'uuid-123';

    userEntity.validate(mockUuidService);

    const errors = userEntity.getErrors();
    expect(errors.size).toBeGreaterThan(0);
    expect(userEntity.isValid()).toBe(false);
  });
});
