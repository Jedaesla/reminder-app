import { CreateUserApplicationDto } from '../../dto/create-user.dto';
import { UpdateUserApplicationDto } from '../../dto/update-user.dto';
import { UserModelApplication } from '../models/user.model';
//User is T as generic
export interface UserApplicationRepository<User extends UserModelApplication> {
  create(user: CreateUserApplicationDto): Promise<User>;
  update(id: string, user: UpdateUserApplicationDto): Promise<User>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<User | null>;
  findByEmail(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
