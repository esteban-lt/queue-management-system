import type { Branch } from '../entities/branch';
import type { CreateBranchDto } from '../dtos/create-branch-dto';
import type { UpdateBranchDto } from '../dtos/update-branch-dto';

export abstract class BranchDatasource {
  public abstract getBranches(organizationId: string): Promise<Branch[]>;
  public abstract getBranchById(id: string): Promise<Branch>;
  public abstract createBranch(organizationId: string, createBranchDto: CreateBranchDto): Promise<Branch>;
  public abstract updateBranchById(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch>;
  public abstract toggleBranchById(id: string): Promise<Branch>;
}
