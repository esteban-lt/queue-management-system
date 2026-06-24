import type { CreateOrganizationDto } from '../dtos/create-organization-dto';
import type { Organization } from '../entities/organization';

export abstract class OrganizationDatasource {
  public abstract createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization>;
}
