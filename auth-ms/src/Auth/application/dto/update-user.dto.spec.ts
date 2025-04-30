import { UpdateUserApplicationDto } from './update-user.dto';

describe('UpdateUserApplicationDto', () => {
  test('should create an instance with correct values', () => {
    const dto = new UpdateUserApplicationDto();
    dto.name = 'test';

    expect(dto).toEqual({
      name: 'test',
    });
  });
});
