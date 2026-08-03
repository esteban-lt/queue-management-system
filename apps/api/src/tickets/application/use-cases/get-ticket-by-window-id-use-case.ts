import { Ticket } from '@tickets/domain/entities/ticket';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';

export class GetTicketByWindowIdUseCase {

  private readonly ticketRepository: TicketRepository;

  constructor(ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  public async execute(windowId: string): Promise<Ticket | null> {
    return this.ticketRepository.findByWindowId(windowId);
  }
}
