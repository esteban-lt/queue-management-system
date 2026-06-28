import type { Branch } from '@branches/domain/entities/branch';
import type { BranchRepository } from '@branches/domain/repositories/branch-repository';
import type { UpdateBranchDto } from '@branches/domain/dtos/update-branch-dto';

export class UpdateBranchByIdUseCase {

  constructor(
    private readonly branchRepository: BranchRepository,
  ) {}

  public async execute(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    return this.branchRepository.updateBranchById(id, updateBranchDto);
  }
}
