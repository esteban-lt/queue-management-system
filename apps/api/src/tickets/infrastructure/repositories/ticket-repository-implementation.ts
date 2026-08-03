import type { TicketDatasource } from '@tickets/domain/datasources/ticket-datasource';
import type { CreateTicketDto } from '@tickets/domain/dtos/create-ticket-dto';
import type { Ticket } from '@tickets/domain/entities/ticket';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';

export class TicketRepositoryImplementation implements TicketRepository {

  private readonly ticketDatasource: TicketDatasource;

  constructor(ticketDatasource: TicketDatasource) {
    this.ticketDatasource = ticketDatasource;
  }
  
  public findAll(organizationId: string): Promise<Ticket[]> {
    return this.ticketDatasource.findAll(organizationId);
  }

  public findByBranchId(branchId: string): Promise<Ticket[]> {
    return this.ticketDatasource.findByBranchId(branchId);
  }

  public findById(id: string): Promise<Ticket | null> {
    return this.ticketDatasource.findById(id);
  }

  public findByWindowId(windowId: string): Promise<Ticket | null> {
    return this.ticketDatasource.findByWindowId(windowId);
  }

  public findNextTicketsByServiceCategoryId(serviceCategoryId: string, limit?: number): Promise<Ticket[]> {
    return this.findNextTicketsByServiceCategoryId(serviceCategoryId, limit);
  }

  public findNextTicketByServiceCategoryId(serviceCategoryId: string): Promise<Ticket | null> {
    return this.findNextTicketByServiceCategoryId(serviceCategoryId);
  }

  public save(branchId: string, dto: CreateTicketDto): Promise<Ticket> {
    return this.ticketDatasource.save(branchId, dto);
  }

  public update(ticket: Ticket): Promise<Ticket> {
    return this.update(ticket);
  }
}
