import { ResponseError } from '@errors/response-error';

import { BranchRepository } from '@branches/domain/repositories/branch-repository';

import { Ticket } from '@tickets/domain/entities/ticket';
import type { CreateTicketDto } from '@tickets/domain/dtos/create-ticket-dto';
import type { ServiceCategoryRepository } from '@service-categories/domain/repositories/service-category-repository';
import type { TicketRepository } from '@tickets/domain/repositories/ticket-repository';

export class CreateTicketUseCase {

  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly branchRepository: BranchRepository,
    private readonly serviceCategoryRepository: ServiceCategoryRepository,
  ) {}

  public async execute(organizationId: string, branchId: string, createTicketDto: CreateTicketDto): Promise<Ticket> {

    const branch = await this.branchRepository.getBranchById(branchId);
    if(!branch || branch.organizationId !== organizationId) throw ResponseError.notFound('branch not found');
    if(!branch.isActive) throw ResponseError.badRequest('inactive branch');

    const { serviceCategoryId } = createTicketDto;

    const serviceCategory = await this.serviceCategoryRepository.findById(serviceCategoryId);
    if(!serviceCategory || serviceCategory.organizationId !== organizationId) throw ResponseError.notFound('service category not found');
    if(!serviceCategory.isActive) throw ResponseError.badRequest('inactive service category');

    return await this.ticketRepository.save(branchId, createTicketDto);
  }
}
