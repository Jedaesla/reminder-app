export interface UuidDomainService {
  generateUuid(): string;
  validateUuid(uuid: string): boolean;
}
