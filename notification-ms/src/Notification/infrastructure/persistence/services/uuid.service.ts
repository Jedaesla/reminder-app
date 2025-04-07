import { v4, validate, version } from 'uuid';
import { UuidDomainService } from 'src/Notification/domain/services/uuid.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UuidService implements UuidDomainService {
  generateUuid(): string {
    const uuid = v4();
    return uuid;
  }
  validateUuid(uuid: string): boolean {
    return validate(uuid) && version(uuid) === 4;
  }
}
