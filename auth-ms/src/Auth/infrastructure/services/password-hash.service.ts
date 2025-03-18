import { PasswordHashDomainService } from 'src/Auth/domain/services/password-hash.service';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHashService implements PasswordHashDomainService {
  hash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
  compare(password: string, passEncrypted: string): boolean {
    return bcrypt.compareSync(password, passEncrypted);
  }
}
