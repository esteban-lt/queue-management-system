import type { UserDatasource } from '@users/domain/datasources/user-datasource';
import type { CreateUserDto } from '@users/domain/dtos/create-user-dto';
import type { UpdateUserBranchDto } from '@users/domain/dtos/update-user-branch-dto';
import type { UpdateUserDto } from '@users/domain/dtos/update-user-dto';
import type { UpdateUserRoleDto } from '@users/domain/dtos/update-user-role-dto';
import type { User } from '@users/domain/entities/user';
import type { UserRepository } from '@users/domain/repositories/user-repository';

export class UserRepositoryImplementation implements UserRepository {

  constructor(
    private readonly userDatasource: UserDatasource,
  ) {}

  public findAll(organizationId: string): Promise<User[]> {
    return this.userDatasource.findAll(organizationId);
  }

  public findById(id: string): Promise<User> {
    return this.userDatasource.findById(id);
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.userDatasource.findByEmail(email); 
  }

  public save(organizationId: string, dto: CreateUserDto): Promise<User> {
    return this.userDatasource.save(organizationId, dto);
  }

  public updateById(id: string, dto: UpdateUserDto): Promise<User> {
    return this.userDatasource.updateById(id, dto);
  }

  public updateRoleById(id: string, dto: UpdateUserRoleDto): Promise<User> {
    return this.userDatasource.updateRoleById(id, dto);
  }

  public updateBranchById(id: string, dto: UpdateUserBranchDto): Promise<User> {
    return this.userDatasource.updateBranchById(id, dto);
  }

  public toggleById(id: string): Promise<User> {
    return this.userDatasource.toggleById(id);
  }
}
