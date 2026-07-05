import type { User } from '@users/domain/entities/user';
import type { UserRepository } from '@users/domain/repositories/user-repository';
import { Mapper } from '@utils/mapper';

export class GetUsersUseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(organizationId: string): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.findAll(organizationId);
    return users.map((user) => Mapper.omit(user, ['password']));
  }
}
