import type { CreateWindowDto } from '../dtos/create-window-dto';
import type { UpdateWindowDto } from '../dtos/update-window-dto';
import type { Window } from '../entities/window';

export abstract class WindowDatasource {
  public abstract findAll(organizationId: string): Promise<Window[]>;
  public abstract findByBranchId(branchId: string): Promise<Window[]>;
  public abstract findById(id: string): Promise<Window | null>;
  public abstract findByServiceCategoryId(serviceCategoryId: string): Promise<Window[]>;
  public abstract save(dto: CreateWindowDto): Promise<Window>;
  public abstract updateById(id: string, dto: UpdateWindowDto): Promise<Window>;
  public abstract toggleById(id: string): Promise<Window>;
}
