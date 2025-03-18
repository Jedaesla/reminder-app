export interface UserDomainService {
  validateUserAndPassword(email: string, password: string): Promise<boolean>;
}
