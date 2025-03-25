import { UserApplicationDto } from '../dto/user.dto';

export interface JwtApplicationService {
  sign(payload: Omit<UserApplicationDto, 'password'>): string;
  verify(token: string, options?: object): any;
}
