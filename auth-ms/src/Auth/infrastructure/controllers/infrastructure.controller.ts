import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { UuidService } from '../services/uuid.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserInfraDto } from '../dto/create-user.dto';
import { ApplicationInterface } from 'src/Auth/application/application.interface';
import { JwtInfrastructureService } from '../services/jwt.service';
import { PasswordHashService } from '../services/password-hash.service';
import { SignInUserInfraDto } from '../dto/sigin-user.dto';

@Controller()
export class InfrastructureController {
  constructor(
    private readonly application: ApplicationInterface,
    private readonly uuidService: UuidService,
    private readonly jwtService: JwtInfrastructureService,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(
    @Payload()
    createUserDto: CreateUserInfraDto,
  ) {
    try {
      const user = await this.application.createUser(
        createUserDto,
        this.uuidService,
        this.passwordHashService,
      );
      const { password: __, ...rest } = user;
      return rest;
      //return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'signin_user' })
  async signInUser(
    @Payload()
    signInUserInfraDto: SignInUserInfraDto,
  ) {
    try {
      const dataLogin = await this.application.signIn(
        signInUserInfraDto,
        this.jwtService,
        this.passwordHashService,
      );
      return dataLogin;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'verify_token' })
  async verifyToken(@Payload() token: string) {
    try {
      const tokenValidate = await this.application.validateToken(
        token,
        this.jwtService,
      );
      return tokenValidate;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
