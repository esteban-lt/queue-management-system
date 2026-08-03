import { Ticket } from '@tickets/domain/entities/ticket';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';

export class GetNextTicketsByServiceCategoryIdUseCase {

  private readonly ticketRepository: TicketRepository;

  constructor(ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  public async execute(serviceCategoryId: string, limit?: number): Promise<Ticket[]> {
    return this.ticketRepository.findNextTicketsByServiceCategoryId(serviceCategoryId, limit);
  }
}
