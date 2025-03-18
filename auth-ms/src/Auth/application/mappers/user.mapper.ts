import { UserApplicationDto } from '../dto/user.dto';
import { UserModelApplication } from '../persistence/models/user.model';

export class UserMapApplication {
  static toApplicationDto(userDto: UserModelApplication): UserApplicationDto {
    return {
      id: userDto.id,
      name: userDto.name,
      email: userDto.email,
      password: userDto.password,
    };
  }
}
