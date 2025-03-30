import { UUID } from 'crypto';
import { User } from '../../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findById(id: UUID): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<void>;
  delete(id: UUID): Promise<void>;
}
