import { Window } from '../entities/window';

export class WindowMapper {

  public static fromObject(object: any): Window {
    return new Window({
      id: object.id,
      branchId: object.branchId,
      serviceCategoryId: object.serviceCategoryId,
      name: object.name,
      isActive: object.isActive,
      createdAt: object.createdAt,
    });
  }
}
