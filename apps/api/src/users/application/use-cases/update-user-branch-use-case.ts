import type { UpdateUserBranchDto } from '@users/domain/dtos/update-user-branch-dto';
import type { User } from '@users/domain/entities/user';
import type { UserRepository } from '@users/domain/repositories/user-repository';
import { Mapper } from '@utils/mapper';
import { password } from 'bun';

export class UpdateUserBranchUseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string, updateUserBranchDto: UpdateUserBranchDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.updateBranchById(id, updateUserBranchDto);
    return Mapper.omit(user, ['password']);
  }
}
