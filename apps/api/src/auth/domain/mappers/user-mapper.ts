import { User } from '../entities/user';

export class UserMapper {

  public static fromObject(object: any): User {
    return new User({
      id: object.id,
      organizationId: object.organizationId,
      branchId: object.branchId || null,
      name: object.name,
      email: object.email,
      password: object.password,
      role: object.role,
      isActive: object.isActive,
      createdAt: object.createdAt,
    });
  }

  public static withoutPassword(user: User): Omit<User, 'password'> {
    const { password: _, ...rest } = user;
    return rest;
  }
}
