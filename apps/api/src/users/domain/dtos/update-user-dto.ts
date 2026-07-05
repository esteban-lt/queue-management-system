import { Validators } from '@plugins/validators';

export class UpdateUserDto {

  private constructor(
    public readonly name?: string,
    public readonly email?: string,
    public readonly password?: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    if(!object) return ['request body is required'];
    const { name, email, password } = object;

    if(!name && !email && !password) return ['at least name, email or password is required'];
    if(name && name.length < 3) return ['name must be at least 3 characters long'];
    if(name && !Validators.isAlphanumeric(name)) return ['name can only contain letters, numbers and spaces'];
    if(email && !Validators.isEmail(email)) return ['invalid email'];
    if(password && !Validators.isStrongPassword(password)) return ['password must be at least 8 characters and contain uppercase a number'];

    return [
      undefined,
      new UpdateUserDto(name, email, password)
    ];
  }
}
