import type { UpdateOrganizationDto } from '@organizations/domain/dtos/update-organization-dto';
import type { Organization } from '@organizations/domain/entities/organization';
import type { OrganizationRepository } from '@organizations/domain/repositories/organization-repository';

export class UpdateOrganizationByIdUseCase {

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  public async execute(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationRepository.updateOrganizationById(id, updateOrganizationDto);
  }
}
