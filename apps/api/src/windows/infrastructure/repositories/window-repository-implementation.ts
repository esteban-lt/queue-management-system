import type { WindowDatasource } from '@windows/domain/datasources/window-datasource';
import type { CreateWindowDto } from '@windows/domain/dtos/create-window-dto';
import type { UpdateWindowDto } from '@windows/domain/dtos/update-window-dto';
import type { Window } from '@windows/domain/entities/window';
import type { WindowRepository } from '@windows/domain/repositories/window-repository';

export class WindowRepositoryImplementation implements WindowRepository {

  constructor(
    private readonly windowDatasource: WindowDatasource,
  ) {}

  public findAll(organizationId: string): Promise<Window[]> {
    return this.windowDatasource.findAll(organizationId);
  }

  public findByBranchId(branchId: string): Promise<Window[]> {
    return this.windowDatasource.findByBranchId(branchId);
  }

  public findById(id: string): Promise<Window | null> {
    return this.windowDatasource.findById(id);
  }

  public findByServiceCategoryId(serviceCategoryId: string): Promise<Window[]> {
    return this.windowDatasource.findByServiceCategoryId(serviceCategoryId);
  }

  public save(dto: CreateWindowDto): Promise<Window> {
    return this.windowDatasource.save(dto);
  }

  public updateById(id: string, dto: UpdateWindowDto): Promise<Window> {
    return this.windowDatasource.updateById(id, dto);
  }

  public toggleById(id: string): Promise<Window> {
    return this.windowDatasource.toggleById(id);
  }
}
