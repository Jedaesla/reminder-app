import { UserMapApplication } from './user.mapper';
import { UserModelApplication } from '../persistence/models/user.model';
import { UserApplicationDto } from '../dto/user.dto';

describe('UserMapApplication', () => {
  test('should map UserModelApplication to UserApplicationDto correctly', () => {
    const userModel: UserModelApplication = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
      isActive: true,
      createdAt: new Date(),
      updatedAt: null,
    };

    const expectedDto: UserApplicationDto = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword',
    };

    const result = UserMapApplication.toApplicationDto(userModel);

    expect(result).toEqual(expectedDto);
  });
});
