import { ServiceCategory } from '../entities/service-category';

export class ServiceCategoryMapper {
  public static fromObject(object: any): ServiceCategory {
    return new ServiceCategory({
      id: String(object.id),
      organizationId: String(object.organizationId),
      name: String(object.name),
      prefix: String(object.prefix),
      avgAttentionMinutes: (object.avgAttentionMinutes != null) ? Number(object.avgAttentionMinutes) : undefined,
      isActive: Boolean(object.isActive),
      createdAt: new Date(object.createdAt),
    });
  }
}