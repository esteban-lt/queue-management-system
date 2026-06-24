import type { AuthDatasource } from '../../domain/datasources/auth-datasource';
import type { User } from '../../domain/entities/user';
import type { CreateUserData } from '../../domain/interfaces/create-user-data';
import type { AuthRepository } from '../../domain/repositories/auth-repository';

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
