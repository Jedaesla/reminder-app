import { SignInUserApplicationDto } from './signin-user.dto';

describe('SignInUserApplicationDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new SignInUserApplicationDto();
    dto.email = 'test@test.com';
    dto.password = '123456';

    expect(dto).toEqual({
      email: 'test@test.com',
      password: '123456',
    });
  });
});
