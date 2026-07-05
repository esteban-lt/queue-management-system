import { ResponseError } from '@errors/response-error';
import { Password } from '@plugins/password';

import type { CreateUserDto } from '@users/domain/dtos/create-user-dto';
import type { User } from '@users/domain/entities/user';
import type { UserRepository } from '@users/domain/repositories/user-repository';
import { Mapper } from '@utils/mapper';

export class CreateUserUseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(organizationId: string, createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const emailExists = await this.userRepository.findByEmail(createUserDto.email);
    if(emailExists) throw ResponseError.badRequest('email already exists');

    const hashedPassword = await Password.hash(createUserDto.password);
    
    const user = await this.userRepository.save(
      organizationId, 
      {
        ...createUserDto, 
        password: hashedPassword,
      }
    );

    return Mapper.omit(user, ['password']);
  }
}
