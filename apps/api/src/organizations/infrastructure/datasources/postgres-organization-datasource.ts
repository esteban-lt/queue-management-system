import { prisma } from '@lib/prisma';
import { ResponseError } from '@errors/response-error';

import { CreateOrganizationDto } from '@organizations/domain/dtos/create-organization-dto';
import { Organization } from '@organizations/domain/entities/organization';
import { OrganizationDatasource } from '@organizations/domain/datasources/organization-datasource';
import { OrganizationMapper } from '@organizations/domain/mappers/organization-mapper';
import { UpdateOrganizationDto } from '@organizations/domain/dtos/update-organization-dto';

export class PostgresOrganizationDatasource implements OrganizationDatasource {

  public async getOrganizations(id: string): Promise<Organization[]> {
    const organizations = await prisma.organization.findMany({
      where: {
        id,
      }
    });
    return organizations.map(OrganizationMapper.fromObject);
  }

  public async getOrganizationById(id: string): Promise<Organization> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      }
    });
    
    if(!organization) throw ResponseError.notFound('organization not found');
    return OrganizationMapper.fromObject(organization);
  }

  public async createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = await prisma.organization.create({
      data: {
        name: createOrganizationDto.name,
        slug: createOrganizationDto.slug,
      }
    });

    return OrganizationMapper.fromObject(organization);
  }

  public async updateOrganizationById(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    const organization = await prisma.organization.findUnique({ where: { id } });
    if(!organization) throw ResponseError.notFound('organization not found');
    
    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: { name: updateOrganizationDto.name },
    });

    return OrganizationMapper.fromObject(updatedOrganization);
  }
}
