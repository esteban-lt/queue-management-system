import { Ticket } from '@tickets/domain/entities/ticket';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';

export class GetTicketsUseCase {

  private readonly ticketRepository: TicketRepository;

  constructor(ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  public async execute(organizationId: string): Promise<Ticket[]> {
    return this.ticketRepository.findAll(organizationId);
  }
}
