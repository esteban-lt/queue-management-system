import type { CreateServiceCategoryDto } from '@service-categories/domain/dtos/create-service-category-dto';
import type { ServiceCategory } from '@service-categories/domain/entities/service-category';
import type { ServiceCategoryRepository } from '@service-categories/domain/repositories/service-category-repository';

export class CreateServiceCategoryUseCase {

  constructor(
    private readonly serviceCategoryRepository: ServiceCategoryRepository,
  ) {}

  public async execute(organizationId: string, createServiceCategoryDto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    return this.serviceCategoryRepository.save(organizationId, createServiceCategoryDto);
  }
}
