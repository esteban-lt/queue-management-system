import type { Branch } from '@branches/domain/entities/branch';
import type { BranchRepository } from '@branches/domain/repositories/branch-repository';

export class ToggleBranchByIdUseCase {

  constructor(
    private readonly branchRepository: BranchRepository,
  ) {}

  public async execute(id: string): Promise<Branch> {
    return this.branchRepository.toggleBranchById(id);
  }
}
