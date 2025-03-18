import { UserApplicationRepository } from '../persistence/repositories/user.repository';
import { UserModelApplication } from '../persistence/models/user.model';
import { Domain } from 'src/Auth/domain/domain.interface';
import { JwtApplicationService } from '../services/jwt.service';
import { UserDomainService } from 'src/Auth/domain/services/user.service';
import { PasswordHashDomainService } from 'src/Auth/domain/services/password-hash.service';
import { SignInUserApplicationDto } from '../dto/signin-user.dto';
import { TokenApplicationDto } from '../dto/token.dto';
import { UseCaseException } from '../exceptions/use-case.exception';
import { UserApplicationDto } from '../dto/user.dto';

export class SignInUserUseCase {
  constructor(
    private readonly userRepository: UserApplicationRepository<UserModelApplication>,
    private readonly domainController: Domain,
    private readonly jwtService: JwtApplicationService,
    private readonly userService: UserDomainService,
    private readonly passwordHashService: PasswordHashDomainService,
  ) {}

  async execute(
    signInDto: SignInUserApplicationDto,
  ): Promise<TokenApplicationDto> {
    const isAuthenticated = await this.domainController.signIn(
      signInDto,
      this.userService,
      this.passwordHashService,
    );

    if (isAuthenticated) {
      const token = new TokenApplicationDto();
      const data = await this.userRepository.findByEmail(signInDto.email);
      if (!data) {
        throw new UseCaseException('Invalid email or password');
      }
      const user = this.mapUserModelToUserDto(data);
      token.token = await this.generateToken(user);
      return token;
    }
    throw new UseCaseException('Invalid email or password');
  }

  private async generateToken(
    data: Omit<UserApplicationDto, 'password'>,
  ): Promise<string> {
    return await this.jwtService.sign(data);
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
