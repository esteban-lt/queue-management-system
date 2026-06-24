import type { OrganizationDatasource } from '../../domain/datasources/organization-datasource';
import type { CreateOrganizationDto } from '../../domain/dtos/create-organization-dto';
import type { Organization } from '../../domain/entities/organization';
import type { OrganizationRepository } from '../../domain/repositories/organization-repository';

export class OrganizationRepositoryImplementation implements OrganizationRepository {

  constructor(
    private readonly organizationDatasource: OrganizationDatasource,
  ) {}

  public createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationDatasource.createOrganization(createOrganizationDto);
  }
}
