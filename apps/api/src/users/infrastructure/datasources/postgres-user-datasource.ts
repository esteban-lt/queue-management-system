import { prisma } from '@lib/prisma';
import { ResponseError } from '@errors/response-error';

import { UserMapper } from '@users/domain/mappers/user-mapper';
import type { CreateUserDto } from '@users/domain/dtos/create-user-dto';
import type { UpdateUserBranchDto } from '@users/domain/dtos/update-user-branch-dto';
import type { UpdateUserDto } from '@users/domain/dtos/update-user-dto';
import type { UpdateUserRoleDto } from '@users/domain/dtos/update-user-role-dto';
import type { User } from '@users/domain/entities/user';
import type { UserDatasource } from '@users/domain/datasources/user-datasource';

export class PostgresUserDatasource implements UserDatasource {

  public async findAll(organizationId: string): Promise<User[]> {
    const users = await prisma.user.findMany({ where: { organizationId } });
    return users.map(UserMapper.fromObject);
  }

  public async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if(!user) throw ResponseError.notFound('user not found');
    return UserMapper.fromObject(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) return null;
    return UserMapper.fromObject(user);
  }

  public async save(organizationId: string, dto: CreateUserDto): Promise<User> {
    const { branchId, name, email, password, role } = dto;
    const createdUser = await prisma.user.create({
      data: {
        organizationId,
        branchId,
        name,
        email,
        password,
        role,
      }
    });
    return UserMapper.fromObject(createdUser);
  }

  public async updateById(id: string, dto: UpdateUserDto): Promise<User> {
    const { name, email, password } = dto;
    const user = await prisma.user.findUnique({ where: { id } });
    if(!user) throw ResponseError.notFound('user not found');
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });
    return UserMapper.fromObject(updatedUser);
  }

  public async updateRoleById(id: string, dto: UpdateUserRoleDto): Promise<User> {
    const { role } = dto;
    const user = await prisma.user.findUnique({ where: { id } });
    if(!user) throw ResponseError.notFound('user not found');
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
    return UserMapper.fromObject(updatedUser);
  }

  public async updateBranchById(id: string, dto: UpdateUserBranchDto): Promise<User> {
    const { branchId } = dto;
    const user = await prisma.user.findUnique({ where: { id } });
    if(!user) throw ResponseError.notFound('user not found');
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        branchId,
      },
    });
    return UserMapper.fromObject(updatedUser);
  }

  public async toggleById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if(!user) throw ResponseError.notFound('user not found');
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: !user.isActive
      }
    });
    return UserMapper.fromObject(updatedUser);
  }
}
