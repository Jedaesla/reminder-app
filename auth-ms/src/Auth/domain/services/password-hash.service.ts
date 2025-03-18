export interface PasswordHashDomainService {
  hash(password: string): string;
  compare(password: string, passEncrypted: string): boolean;
}
