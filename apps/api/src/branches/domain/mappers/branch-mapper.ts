import { Branch } from '../entities/branch';

export class BranchMapper {

  public static fromObject(object: any): Branch {
    return new Branch({
      id: object.id,
      organizationId: object.organizationId,
      name: object.name,
      address: object.address,
      isActive: object.isActive,
      createdAt: object.createdAt,
    });
  }
}
