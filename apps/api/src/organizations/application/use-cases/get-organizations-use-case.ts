import type { Organization } from '@organizations/domain/entities/organization';
import type { OrganizationRepository } from '@organizations/domain/repositories/organization-repository';

export class GetOrganizationsUseCase {

  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  public async execute(id: string): Promise<Organization[]> {
    return this.organizationRepository.getOrganizations(id);
  } 
}
