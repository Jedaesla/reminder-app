import { UserApplicationRepository } from '../persistence/repositories/user.repository';
import { UserModelApplication } from '../persistence/models/user.model';
import { Domain } from 'src/Auth/domain/domain.interface';
import { JwtApplicationService } from '../services/jwt.service';
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
    private readonly passwordHashService: PasswordHashDomainService,
  ) {}

  async execute(
    signInDto: SignInUserApplicationDto,
  ): Promise<TokenApplicationDto> {
    const isValidDataLogin = this.domainController.signIn(
      signInDto,
      this.passwordHashService,
    );

    if (isValidDataLogin) {
      const token = new TokenApplicationDto();
      const userData = await this.userRepository.findByEmail(signInDto.email);
      if (!userData) {
        throw new UseCaseException('Invalid email or password');
      }
      const isPasswordValid = this.passwordHashService.compare(
        signInDto.password,
        userData.password,
      );
      if (!isPasswordValid) {
        throw new UseCaseException('Invalid email or password');
      }
      const user = this.mapUserModelToUserDto(userData);
      token.token = this.generateToken(user);
      return token;
    }
    throw new UseCaseException('Invalid email or password');
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
