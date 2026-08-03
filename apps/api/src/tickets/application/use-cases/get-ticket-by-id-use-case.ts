import { Ticket } from '@tickets/domain/entities/ticket';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';

export class GetTicketByIdUseCase {

  private readonly ticketRepository: TicketRepository;

  constructor(ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  public async execute(id: string): Promise<Ticket | null> {
    return this.ticketRepository.findById(id);
  }
}
