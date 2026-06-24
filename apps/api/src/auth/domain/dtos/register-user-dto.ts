import { Validators } from '@plugins/validators';

export class RegisterUserDto {
  
  private constructor(
    public readonly organizationName: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    if(!object) return ['request body is required'];
    const { organizationName, name, email, password } = object;

    if(!organizationName) return ['organization name is required'];
    if(!name) return ['name is required'];
    if(name.length < 3) return ['name must be at least 3 characters long'];
    if(!Validators.isAlphanumeric(name)) return ['name can only contain letters, numbers and spaces'];
    if(!email) return ['email is required'];
    if(!Validators.isEmail(email)) return ['invalid email'];
    if(!password) return ['password is required'];
    if(!Validators.isStrongPassword(password)) return ['password must be at least 8 characters and contain uppercase a number'];

    return [
      undefined, 
      new RegisterUserDto(organizationName, name, email, password)
    ];
  }
}
