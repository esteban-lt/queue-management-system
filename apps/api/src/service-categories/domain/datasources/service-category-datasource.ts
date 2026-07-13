import type { CreateServiceCategoryDto } from '../dtos/create-service-category-dto';
import type { UpdateServiceCategoryDto } from '../dtos/update-service-category-dto';
import type { ServiceCategory } from '../entities/service-category';

export abstract class ServiceCategoryDatasource {
  public abstract findAll(organizationId: string): Promise<ServiceCategory[]>;
  public abstract findById(id: string): Promise<ServiceCategory>;
  public abstract save(organizationId: string, dto: CreateServiceCategoryDto): Promise<ServiceCategory>;
  public abstract updateById(id: string, dto: UpdateServiceCategoryDto): Promise<ServiceCategory>;
  public abstract toggleById(id: string): Promise<ServiceCategory>;
}
