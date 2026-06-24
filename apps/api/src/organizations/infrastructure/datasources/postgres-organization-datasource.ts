import { prisma } from '@lib/prisma';
import type { OrganizationDatasource } from '../../domain/datasources/organization-datasource';
import type { CreateOrganizationDto } from '../../domain/dtos/create-organization-dto';
import { Organization } from '../../domain/entities/organization';
import { OrganizationMapper } from '../../domain/mappers/organization-mapper';

export class PostgresOrganizationDatasource implements OrganizationDatasource {

  public async createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = await prisma.organization.create({
      data: {
        name: createOrganizationDto.name,
        slug: createOrganizationDto.slug,
      }
    });

    return OrganizationMapper.fromObject(organization);
  }
}
