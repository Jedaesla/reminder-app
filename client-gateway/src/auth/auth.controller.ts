import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sigin-user.dto';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('Auth-----');
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await firstValueFrom(
        this.client.send({ cmd: 'create_user' }, createUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async signInUser(@Body() signInUserDto: SignInUserDto) {
    try {
      const user = await firstValueFrom(
        this.client.send({ cmd: 'signin_user' }, signInUserDto),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
