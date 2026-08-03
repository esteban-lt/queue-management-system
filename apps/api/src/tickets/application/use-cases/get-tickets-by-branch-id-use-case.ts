import { Ticket } from '@tickets/domain/entities/ticket';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';

export class GetTicketsByBranchIdUseCase {

  private readonly ticketRepository: TicketRepository;

  constructor(ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  public async execute(branchId: string): Promise<Ticket[]> {
    return this.ticketRepository.findByBranchId(branchId);
  }
}
