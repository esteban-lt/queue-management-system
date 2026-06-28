import { prisma } from '@lib/prisma';7

import { AuthDatasource } from '@auth/domain/datasources/auth-datasource';
import type { CreateUserData } from '@auth/domain/interfaces/create-user-data';
import { User } from '@auth/domain/entities/user';
import { UserMapper } from '@auth/domain/mappers/user-mapper';

export class PostgresAuthDatasource implements AuthDatasource {

  public async createUser(data: CreateUserData): Promise<User> {
    const user = await prisma.user.create({ 
      data: {
        organizationId: data.organizationId,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      }
    });
    return UserMapper.fromObject(user);
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return UserMapper.fromObject(user);
  }
}
