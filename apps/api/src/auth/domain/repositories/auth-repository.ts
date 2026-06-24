import type { User } from '../entities/user';
import type { CreateUserData } from '../interfaces/create-user-data';

export abstract class AuthRepository {
  public abstract createUser(data: CreateUserData): Promise<User>;
  public abstract findUserByEmail(email: string): Promise<User | null>;
}
