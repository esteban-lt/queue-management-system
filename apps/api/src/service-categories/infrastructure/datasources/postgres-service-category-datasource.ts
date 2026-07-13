import { ResponseError } from '@errors/response-error';
import { prisma } from '@lib/prisma';
import type { ServiceCategoryDatasource } from '@service-categories/domain/datasources/service-category-datasource';
import type { CreateServiceCategoryDto } from '@service-categories/domain/dtos/create-service-category-dto';
import type { UpdateServiceCategoryDto } from '@service-categories/domain/dtos/update-service-category-dto';
import { ServiceCategory } from '@service-categories/domain/entities/service-category';
import { ServiceCategoryMapper } from '@service-categories/domain/mappers/service-category-mapper';

export class PostgresServiceCategoryDatasource implements ServiceCategoryDatasource {

  public async findAll(organizationId: string): Promise<ServiceCategory[]> {
    const servicesCategories = await prisma.serviceCategory.findMany({ where: { organizationId } });
    return servicesCategories.map(ServiceCategoryMapper.fromObject);
  }

  public async findById(id: string): Promise<ServiceCategory> {
    const serviceCategory = await prisma.serviceCategory.findUnique({ where: { id } });
    if(!serviceCategory) throw ResponseError.notFound('service category not found');
    return ServiceCategoryMapper.fromObject(serviceCategory);
  }

  public async save(organizationId: string, dto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    const { name, prefix } = dto;
    const serviceCategory = await prisma.serviceCategory.create({
      data: {
        organizationId,
        name,
        prefix,
      },
    });
    return ServiceCategoryMapper.fromObject(serviceCategory);
  }

  public async updateById(id: string, dto: UpdateServiceCategoryDto): Promise<ServiceCategory> {
    const serviceCategoryExists = await prisma.serviceCategory.findUnique({ where: { id } });
    if(!serviceCategoryExists) throw ResponseError.notFound('service category not found');

    const { name, prefix } = dto;
    const updatedServiceCategory = await prisma.serviceCategory.update({
      where: {
        id,
      },
      data: {
        name,
        prefix,
      },
    });

    return ServiceCategoryMapper.fromObject(updatedServiceCategory);
  }

  public async toggleById(id: string): Promise<ServiceCategory> {
    const serviceCategory = await prisma.serviceCategory.findUnique({ where: { id } });
    if(!serviceCategory) throw ResponseError.notFound('service category not found');

    const updatedServiceCategory = await prisma.serviceCategory.update({
      where: {
        id,
      },
      data: {
        isActive: serviceCategory.isActive!,
      },
    });

    return ServiceCategoryMapper.fromObject(updatedServiceCategory);
  }
}
