import { Validators } from '@plugins/validators';

export class LoginDto {

  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}


  public static create(object: { [key: string]: any }): [string?, LoginDto?] {
    if(!object) return ['request body is required'];
    const { email, password } = object;

    if (!email) return ['email is required'];
    if (!Validators.isEmail(email)) return ['invalid email'];
    if (!password) return ['password is required'];

    return [
      undefined, 
      new LoginDto(email, password)
    ];
  }
}
