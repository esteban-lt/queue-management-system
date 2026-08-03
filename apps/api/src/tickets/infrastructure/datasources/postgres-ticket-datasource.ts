import { prisma } from '@lib/prisma';

import { ResponseError } from '@errors/response-error';

import type { TicketDatasource } from '@tickets/domain/datasources/ticket-datasource';
import type { CreateTicketDto } from '@tickets/domain/dtos/create-ticket-dto';
import { Ticket } from '@tickets/domain/entities/ticket';
import { TicketMapper } from '@tickets/domain/mappers/ticket-mapper';
import { Prisma } from '../../../../generated/prisma/client';

export class PostgresTicketDatasource implements TicketDatasource {

  public async findAll(organizationId: string): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({ where: { branch: { organizationId } } });
    return tickets.map(TicketMapper.fromObject);
  }

  public async findByBranchId(branchId: string): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({ where: { branchId } });
    return tickets.map(TicketMapper.fromObject);
  }

  public async findById(id: string): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if(!ticket) return null;
    return TicketMapper.fromObject(ticket);
  }

  public async findByWindowId(windowId: string): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findFirst({ 
      where: { 
        windowId,
        status: {
          in: ['called', 'attending'],
        },
      }, 
      orderBy: { 
        createdAt: 'asc',
      },
    });
    if(!ticket) return null;
    return TicketMapper.fromObject(ticket); 
  }

  public async findNextTicketsByServiceCategoryId(serviceCategoryId: string, limit?: number): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
      where: {
        serviceCategoryId,
        status: 'waiting',
      },
      take: limit,
      orderBy: {
        createdAt: 'asc',
      },
    });
    return tickets.map(TicketMapper.fromObject);
  }

  public async findNextTicketByServiceCategoryId(serviceCategoryId: string): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findFirst({
      where: {
        serviceCategoryId,
        status: 'waiting',
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    if(!ticket) return null;
    return TicketMapper.fromObject(ticket);
  }

  public async save(branchId: string, dto: CreateTicketDto): Promise<Ticket> {
    const { serviceCategoryId } = dto;

    const serviceCategory = await prisma.serviceCategory.findUnique({ 
      where: { 
        id: serviceCategoryId 
      },
      select: {
        prefix: true,
      },
    });
    if(!serviceCategory) throw ResponseError.notFound('could not generate ticket code for this service category');

    const MAX_RETRIES = 3;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const ticketsCount = await prisma.ticket.count({ where: { branchId } });
        const nextTicketCodeNumber = ticketsCount + 1;
        const ticketCode = `${serviceCategory.prefix}-${String(nextTicketCodeNumber).padStart(7, '0')}`;

        const createdTicket = await prisma.ticket.create({
          data: {
            branchId,
            serviceCategoryId,
            code: ticketCode,
            status: 'waiting',
          },
        });

        return TicketMapper.fromObject(createdTicket);
      } catch (error) {
        const isUniqueConstraintError = error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
        if (!isUniqueConstraintError) throw error;
      }
    }

    throw ResponseError.internalServerError('could not generate ticket code after multiple attempts');
  }

  public async update(ticket: Ticket): Promise<Ticket> {
    const ticketExists = await prisma.ticket.findUnique({ where: { id: ticket.id } });
    if(!ticketExists) throw ResponseError.notFound('ticket not found');
    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        windowId: ticket.windowId,
        attendedBy: ticket.attendedBy,
        status: ticket.status,
        calledAt: ticket.calledAt,
        completedAt: ticket.completedAt,
      },
    });
    return TicketMapper.fromObject(updatedTicket);
  }
}
