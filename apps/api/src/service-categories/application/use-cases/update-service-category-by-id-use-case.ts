import type { UpdateServiceCategoryDto } from '@service-categories/domain/dtos/update-service-category-dto';
import type { ServiceCategory } from '@service-categories/domain/entities/service-category';
import type { ServiceCategoryRepository } from '@service-categories/domain/repositories/service-category-repository';

export class UpdateServiceCategoryByIdUseCase {

  constructor(
    private readonly serviceCategoryRepository: ServiceCategoryRepository,
  ) {}

  public async execute(id: string, updateServiceCategoryDto: UpdateServiceCategoryDto): Promise<ServiceCategory> {
    return this.serviceCategoryRepository.updateById(id, updateServiceCategoryDto);
  }
}
