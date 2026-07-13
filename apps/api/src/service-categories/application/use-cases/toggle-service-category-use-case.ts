import type { ServiceCategory } from '@service-categories/domain/entities/service-category';
import type { ServiceCategoryRepository } from '@service-categories/domain/repositories/service-category-repository';

export class ToggleServiceCategoryByIdUseCase {

  constructor(
    private readonly serviceCategoryRepository: ServiceCategoryRepository,
  ) {}

  public async execute(id: string): Promise<ServiceCategory> {
    return this.serviceCategoryRepository.toggleById(id);
  }
}
