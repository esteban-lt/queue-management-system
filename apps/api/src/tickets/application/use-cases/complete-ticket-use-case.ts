import { ResponseError } from '@errors/response-error';

import type { BranchRepository } from '@branches/domain/repositories/branch-repository';
import type { Ticket } from '@tickets/domain/entities/ticket';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';
import type { WindowRepository } from '@windows/domain/repositories/window-repository';

export class CompleteTicketUseCase {

  constructor(
    private readonly branchRepository: BranchRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly windowRepository: WindowRepository,
  ) {}

  public async execute(organizationId: string, windowId: string): Promise<Ticket> {
    
    const window = await this.windowRepository.findById(windowId);
    if(!window) throw ResponseError.notFound('window not found');
    if(!window.isActive) throw ResponseError.badRequest('inactive window');

    const branch = await this.branchRepository.getBranchById(window.branchId);
    if(!branch || branch.organizationId !== organizationId) throw ResponseError.notFound('window not found');

    const ticket = await this.ticketRepository.findByWindowId(windowId);
    if(!ticket) throw ResponseError.badRequest('there are no tickets to complete');

    const completedTicket = ticket.complete();

    return this.ticketRepository.update(completedTicket);
  }
}
