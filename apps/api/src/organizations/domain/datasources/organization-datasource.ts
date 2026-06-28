import type { CreateOrganizationDto } from '../dtos/create-organization-dto';
import type { UpdateOrganizationDto } from '../dtos/update-organization-dto';
import type { Organization } from '../entities/organization';

export abstract class OrganizationDatasource {
  public abstract getOrganizations(id: string): Promise<Organization[]>;
  public abstract getOrganizationById(id: string): Promise<Organization>;
  public abstract createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization>;
  public abstract updateOrganizationById(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization>;
}
