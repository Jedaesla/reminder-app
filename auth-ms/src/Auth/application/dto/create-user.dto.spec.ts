import { CreateUserApplicationDto } from './create-user.dto';

describe('CreateUserApplicationDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new CreateUserApplicationDto();
    dto.name = 'Test';
    dto.email = 'test@test.com';
    dto.password = '123456';

    expect(dto).toEqual({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });
  });
});
