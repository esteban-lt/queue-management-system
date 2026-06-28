import type { Branch } from '@branches/domain/entities/branch';
import type { BranchRepository } from '@branches/domain/repositories/branch-repository';
import type { CreateBranchDto } from '@branches/domain/dtos/create-branch-dto';

export class CreateBranchUseCase {

  constructor(
    private readonly branchRepository: BranchRepository,
  ) {}

  public async execute(organizationId: string, createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchRepository.createBranch(organizationId, createBranchDto);
  }
}
