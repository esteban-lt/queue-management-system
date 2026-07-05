import type { UpdateUserDto } from '@users/domain/dtos/update-user-dto';
import type { User } from '@users/domain/entities/user';
import type { UserRepository } from '@users/domain/repositories/user-repository';
import { Mapper } from '@utils/mapper';

export class UpdateUserUseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.updateById(id, updateUserDto);
    return Mapper.omit(user, ['password']);
  }
}
