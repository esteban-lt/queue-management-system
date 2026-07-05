import { roles, type Role } from '@auth/domain/types/role';
import { Validators } from '@plugins/validators';

export class CreateUserDto {

  private constructor(
    public readonly branchId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: Role,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    if(!object) return ['request body is required'];
    const { branchId, name, email, password, role } = object;

    if(!branchId) return ['branchId is required'];
    if(!name) return ['name is required'];
    if(name.length < 3) return ['name must be at least 3 characters long'];
    if(!Validators.isAlphanumeric(name)) return ['name can only contain letters, numbers and spaces'];
    if(!email) return ['email is required'];
    if(!Validators.isEmail(email)) return ['invalid email'];
    if(!password) return ['password is required'];
    if(!Validators.isStrongPassword(password)) return ['password must be at least 8 characters and contain uppercase a number'];
    if(!role) return ['role is required'];
    if(!roles.includes(role)) return ['invalid role'];

    return [
      undefined,
      new CreateUserDto(branchId, name, email, password, role)
    ];
  }
}
