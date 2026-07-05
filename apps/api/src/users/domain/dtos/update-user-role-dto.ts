import { roles, type Role } from '@auth/domain/types/role';

export class UpdateUserRoleDto {

  private constructor(
    public readonly role: Role,
  ) { }

  public static create(object: { [key: string]: any }): [string?, UpdateUserRoleDto?] {
    if(!object) return ['request body is required'];
    const { role } = object;

    if(!role) return ['role is required'];
    if(!roles.includes(role)) return ['invalid role'];
    
    return [
      undefined,
      new UpdateUserRoleDto(role)
    ];
  }
}
