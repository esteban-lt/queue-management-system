import type { ServiceCategoryDatasource } from '@service-categories/domain/datasources/service-category-datasource';
import type { CreateServiceCategoryDto } from '@service-categories/domain/dtos/create-service-category-dto';
import type { UpdateServiceCategoryDto } from '@service-categories/domain/dtos/update-service-category-dto';
import type { ServiceCategory } from '@service-categories/domain/entities/service-category';
import type { ServiceCategoryRepository } from '@service-categories/domain/repositories/service-category-repository';

export class ServiceCategoryRepositoryImplementation implements ServiceCategoryRepository {

  constructor(
    private readonly serviceCategoryDatasource: ServiceCategoryDatasource,
  ) {}

  public findAll(organizationId: string): Promise<ServiceCategory[]> {
    return this.serviceCategoryDatasource.findAll(organizationId);
  }

  public findById(id: string): Promise<ServiceCategory> {
    return this.serviceCategoryDatasource.findById(id);
  }

  public save(organizationId: string, dto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    return this.serviceCategoryDatasource.save(organizationId, dto);
  }

  public updateById(id: string, dto: UpdateServiceCategoryDto): Promise<ServiceCategory> {
    return this.serviceCategoryDatasource.updateById(id, dto);
  }
  
  public toggleById(id: string): Promise<ServiceCategory> {
    return this.toggleById(id);
  }
}
