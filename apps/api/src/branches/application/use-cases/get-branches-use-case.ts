import type { Branch } from '@branches/domain/entities/branch';
import type { BranchRepository } from '@branches/domain/repositories/branch-repository';

export class GetBranchesUseCase {

  constructor(
    private readonly branchRepository: BranchRepository,
  ) {}

  public async execute(organizationId: string): Promise<Branch[]> {
    return this.branchRepository.getBranches(organizationId);
  }
}
