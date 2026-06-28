import type { AuthDatasource } from '@auth/domain/datasources/auth-datasource';
import type { User } from '@auth/domain/entities/user';
import type { CreateUserData } from '@auth/domain/interfaces/create-user-data';
import type { AuthRepository } from '@auth/domain/repositories/auth-repository';

export class AuthRepositoryImplementation implements AuthRepository {

  constructor(
    private readonly authDatasource: AuthDatasource,
  ) {}

  public createUser(data: CreateUserData): Promise<User> {
    return this.authDatasource.createUser(data);
  }

  public findUserByEmail(email: string): Promise<User | null> {
    return this.authDatasource.findUserByEmail(email);
  }
}
