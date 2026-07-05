import type { User } from '@users/domain/entities/user';
import type { UserRepository } from '@users/domain/repositories/user-repository';
import { Mapper } from '@utils/mapper';

export class GetUserByIdUseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findById(id);
    return Mapper.omit(user, ['password']);
  }
}
