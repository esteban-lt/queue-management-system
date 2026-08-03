import { Ticket } from '@tickets/domain/entities/ticket';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';

export class GetNextTicketByServiceCategoryIdUseCase {

  private readonly ticketRepository: TicketRepository;

  constructor(ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  public async execute(serviceCategoryId: string): Promise<Ticket | null> {
    return this.ticketRepository.findNextTicketByServiceCategoryId(serviceCategoryId);
  }
}
