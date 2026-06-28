import type { Branch } from "@branches/domain/entities/branch";
import type { BranchDatasource } from "@branches/domain/datasources/branch-datasource";
import type { BranchRepository } from "@branches/domain/repositories/branch-repository";
import type { CreateBranchDto } from "@branches/domain/dtos/create-branch-dto";
import type { UpdateBranchDto } from "@branches/domain/dtos/update-branch-dto";

export class BranchRepositoryImplementation implements BranchRepository {

  constructor(
    private readonly branchDatasource: BranchDatasource,
  ) {}

  public getBranches(organizationId: string): Promise<Branch[]> {
    return this.branchDatasource.getBranches(organizationId);
  }

  public getBranchById(id: string): Promise<Branch> {
    return this.branchDatasource.getBranchById(id);
  }

  public createBranch(organizationId: string, createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchDatasource.createBranch(organizationId, createBranchDto);
  }

  public updateBranchById(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    return this.branchDatasource.updateBranchById(id, updateBranchDto);
  }

  public toggleBranchById(id: string): Promise<Branch> {
    return this.branchDatasource.toggleBranchById(id);
  }
}
