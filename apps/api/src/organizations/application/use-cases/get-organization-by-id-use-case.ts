import type { Organization } from '@organizations/domain/entities/organization';
import type { OrganizationRepository } from '@organizations/domain/repositories/organization-repository';

export class GetOrganizationByIdUseCase {

  constructor(
    private readonly orgnizationRepository: OrganizationRepository,
  ) {}

  public async execute(id: string): Promise<Organization> {
    return this.orgnizationRepository.getOrganizationById(id);
  }
}
