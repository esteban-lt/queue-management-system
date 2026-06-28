import type { UpdateOrganizationDto } from '@organizations/domain/dtos/update-organization-dto';
import type { OrganizationDatasource } from '@organizations/domain/datasources/organization-datasource';
import type { CreateOrganizationDto } from '@organizations/domain/dtos/create-organization-dto';
import type { Organization } from '@organizations/domain/entities/organization';
import type { OrganizationRepository } from '@organizations/domain/repositories/organization-repository';

export class OrganizationRepositoryImplementation implements OrganizationRepository {

  constructor(
    private readonly organizationDatasource: OrganizationDatasource,
  ) {}

  public getOrganizations(id: string): Promise<Organization[]> {
    return this.organizationDatasource.getOrganizations(id);
  }

  public getOrganizationById(id: string): Promise<Organization> {
    return this.organizationDatasource.getOrganizationById(id);
  }

  public createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationDatasource.createOrganization(createOrganizationDto);
  }

  public updateOrganizationById(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationDatasource.updateOrganizationById(id, updateOrganizationDto);
  }
}
