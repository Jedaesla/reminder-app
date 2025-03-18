import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserApplicationDto } from 'src/Auth/application/dto/user.dto';
import { JwtApplicationService } from 'src/Auth/application/services/jwt.service';

@Injectable()
export class JwtInfrastructureService implements JwtApplicationService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: Omit<UserApplicationDto, 'password'>): string {
    return this.jwtService.sign(payload);
  }
  verify(token: string, options?: object): Promise<boolean> {
    return this.jwtService.verify(token, options);
  }
}
