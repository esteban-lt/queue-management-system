import type { Window } from '@windows/domain/entities/window';
import type { WindowRepository } from '@windows/domain/repositories/window-repository';

export class GetWindowsUseCase {

  constructor(
    private readonly windowRepository: WindowRepository,
  ) {}

  public async execute(organizationId: string): Promise<Window[]> {
    return this.windowRepository.findAll(organizationId);
  }
}
