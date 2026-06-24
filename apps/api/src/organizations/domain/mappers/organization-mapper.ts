import { Organization } from '../entities/organization';

export class OrganizationMapper {

  public static fromObject(object: any): Organization {
    return new Organization({
      id: object.id,
      name: object.name,
      slug: object.slug,
      isActive: object.isActive,
      createdAt: object.createdAt,
    });
  }
}
