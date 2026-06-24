import { Jwt, Password } from '@plugins/index';

import type { LoginDto } from '../../domain/dtos/login-dto';
import type { AuthRepository } from '../../domain/repositories/auth-repository';
import type { AuthenticatedUser } from '../../domain/entities/authenticated-user';
import { UserMapper } from '../../domain/mappers/user-mapper';
import { ResponseError } from '@errors/response-error';

export class LoginUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  public async execute(loginDto: LoginDto): Promise<AuthenticatedUser> {
    const user = await this.authRepository.findUserByEmail(loginDto.email);
    if(!user) throw ResponseError.unauthorized('invalid credentials');
    if(!user.isActive) throw new Error('user no active');

    const isPasswordValid = await Password.compare(loginDto.password, user.password);
    if(!isPasswordValid) throw ResponseError.unauthorized('invalid credentials');

    const token = await Jwt.sign({ id: user.id });

    return {
      user: UserMapper.withoutPassword(user),
      token,
    };
  }
}
