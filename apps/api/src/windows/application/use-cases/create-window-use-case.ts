import type { CreateWindowDto } from '@windows/domain/dtos/create-window-dto';
import type { Window } from '@windows/domain/entities/window';
import type { WindowRepository } from '@windows/domain/repositories/window-repository';

export class CreateWindowUseCase {

  constructor(
    private readonly windowRepository: WindowRepository,
  ) {}

  public async execute(createWindowDto: CreateWindowDto): Promise<Window> {
    return this.windowRepository.save(createWindowDto);
  }
}
