import type { UpdateUserRoleDto } from '@users/domain/dtos/update-user-role-dto';
import type { User } from '@users/domain/entities/user';
import type { UserRepository } from '@users/domain/repositories/user-repository';
import { Mapper } from '@utils/mapper';

export class UpdateUserRoleUseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.updateRoleById(id, updateUserRoleDto);
    return Mapper.omit(user, ['password']);
  }
}
