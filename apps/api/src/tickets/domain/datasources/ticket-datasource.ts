import type { CreateTicketDto } from '../dtos/create-ticket-dto';
import type { Ticket } from '../entities/ticket';

export abstract class TicketDatasource {
  public abstract findAll(organizationId: string): Promise<Ticket[]>;
  public abstract findByBranchId(branchId: string): Promise<Ticket[]>;
  public abstract findById(id: string): Promise<Ticket | null>;
  public abstract findByWindowId(windowId: string): Promise<Ticket | null>;
  public abstract findNextTicketsByServiceCategoryId(serviceCategoryId: string, limit?: number): Promise<Ticket[]>;
  public abstract findNextTicketByServiceCategoryId(serviceCategoryId: string): Promise<Ticket | null>;
  public abstract save(branchId: string, dto: CreateTicketDto): Promise<Ticket>;
  public abstract update(ticket: Ticket): Promise<Ticket>;
}
