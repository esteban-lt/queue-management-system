import { prisma } from '@lib/prisma';
import type { AuthDatasource } from '../../domain/datasources/auth-datasource';
import type { User } from '../../domain/entities/user';
import { UserMapper } from '../../domain/mappers/user-mapper';
import type { CreateUserData } from '../../domain/interfaces/create-user-data';

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
