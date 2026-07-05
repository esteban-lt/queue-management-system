import type { CreateUserDto } from '../dtos/create-user-dto';
import type { UpdateUserBranchDto } from '../dtos/update-user-branch-dto';
import type { UpdateUserDto } from '../dtos/update-user-dto';
import type { UpdateUserRoleDto } from '../dtos/update-user-role-dto';
import type { User } from '../entities/user';

export abstract class UserDatasource {
  public abstract findAll(organizationId: string): Promise<User[]>;
  public abstract findById(id: string): Promise<User>;
  public abstract findByEmail(email: string): Promise<User | null>;
  public abstract save(organizationId: string, dto: CreateUserDto): Promise<User>;
  public abstract updateById(id: string, dto: UpdateUserDto): Promise<User>;
  public abstract updateRoleById(id: string, dto: UpdateUserRoleDto): Promise<User>;
  public abstract updateBranchById(id: string, dto: UpdateUserBranchDto): Promise<User>;
  public abstract toggleById(id: string): Promise<User>;
}
