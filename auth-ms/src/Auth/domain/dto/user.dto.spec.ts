import { UserDomainDto } from './user.dto';

describe('UserDomainDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new UserDomainDto();
    dto.id = '12345-67890';
    dto.name = 'Test';
    dto.email = 'test@test.com';
    dto.password = '123456';
    dto.isActive = true;

    expect(dto).toEqual({
      id: '12345-67890',
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
      isActive: true,
    });
  });
});
