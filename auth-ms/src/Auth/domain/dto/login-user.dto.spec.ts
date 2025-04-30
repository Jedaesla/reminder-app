import { LoginUserDomainDto } from './login-user.dto';

describe('LoginUserDomainDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new LoginUserDomainDto();
    dto.email = 'test@test.com';
    dto.password = '123456';

    expect(dto).toEqual({
      email: 'test@test.com',
      password: '123456',
    });
  });
});
