import { UserModelApplication } from '../persistence/models/user.model';
import { JwtApplicationService } from '../services/jwt.service';

import { TokenApplicationDto } from '../dto/token.dto';
import { UserApplicationDto } from '../dto/user.dto';
import { envs } from 'src/config';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';

export class ValidateTokenUseCase {
  constructor(private readonly jwtService: JwtApplicationService) {}

  async execute(token: string): Promise<{ token: string; user: JwtPayload }> {
    const { sub, iat, exp, ...userData } = await this.jwtService.verify(token, {
      secret: envs.jwtSecret,
    });

    const newToken = new TokenApplicationDto();

    const user = this.mapUserModelToUserDto(userData);
    newToken.token = this.generateToken(user);
    return {
      token: newToken.token,
      user: { ...userData },
    };
  }

  private generateToken(data: Omit<UserApplicationDto, 'password'>): string {
    const payload = {
      id: data.id,
      email: data.email,
      name: data.name,
    };
    return this.jwtService.sign(payload);
  }

  private mapUserModelToUserDto(
    user: UserModelApplication,
  ): UserApplicationDto {
    const userDto = new UserApplicationDto();
    userDto.id = user.id;
    userDto.name = user.name;
    userDto.email = user.email;
    return userDto;
  }
}
