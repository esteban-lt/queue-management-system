import type { UpdateWindowDto } from '@windows/domain/dtos/update-window-dto';
import type { Window } from '@windows/domain/entities/window';
import type { WindowRepository } from '@windows/domain/repositories/window-repository';

export class UpdateWindowByIdUseCase {

  constructor(
    private readonly windowRepository: WindowRepository,
  ) {}

  public async execute(id: string, updateWindowDto: UpdateWindowDto): Promise<Window> {
    return this.windowRepository.updateById(id, updateWindowDto);
  }
}
