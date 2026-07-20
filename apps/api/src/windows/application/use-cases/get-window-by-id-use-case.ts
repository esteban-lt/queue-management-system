import type { Window } from '@windows/domain/entities/window';
import type { WindowRepository } from '@windows/domain/repositories/window-repository';

export class GetWindowByIdUseCase {

  constructor(
    private readonly windowRepository: WindowRepository,
  ) {}

  public async execute(id: string): Promise<Window | null> {
    return this.windowRepository.findById(id)
  }
}
