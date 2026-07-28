import { Ticket } from '../entities/ticket';

export class TicketMapper {

  public static fromObject(object: any): Ticket {
    return new Ticket({
      id: object.id,
      branchId: object.branchId,
      serviceCategoryId: object.serviceCategoryId,
      windowId: object.windowId,
      attendedBy: object.attendedBy,
      code: object.code,
      status: object.status,
      calledAt: object.calledAt,
      completedAt: object.completedAt,
      createdAt: object.createdAt,
    });
  }
}
