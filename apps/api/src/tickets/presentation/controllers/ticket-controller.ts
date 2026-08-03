import type { Request, Response } from 'express';
import { ResponseError } from '@errors/response-error';

import type { 
  CallNextTicketUseCase, 
  CompleteTicketUseCase, 
  CreateTicketUseCase, 
  GetNextTicketByServiceCategoryIdUseCase, 
  GetNextTicketsByServiceCategoryIdUseCase, 
  GetTicketByIdUseCase, 
  GetTicketByWindowIdUseCase, 
  GetTicketsByBranchIdUseCase, 
  GetTicketsUseCase, 
  SkipTicketUseCase, 
  StartAttentionUseCase 
} from '@tickets/application/use-cases';

import { CreateTicketDto } from '@tickets/domain/dtos/create-ticket-dto';

interface UseCases {
  callNextTicketUseCase: CallNextTicketUseCase;
  completeTicketUseCase: CompleteTicketUseCase;
  createTicketUseCase: CreateTicketUseCase;
  getNextTicketByServiceCategoryIdUseCase: GetNextTicketByServiceCategoryIdUseCase;
  getNextTicketsByServiceCategoryIdUseCase: GetNextTicketsByServiceCategoryIdUseCase;
  getTicketByIdUseCase: GetTicketByIdUseCase;
  getTicketByWindowIdUseCase: GetTicketByWindowIdUseCase;
  getTicketsByBranchIdUseCase: GetTicketsByBranchIdUseCase;
  getTicketsUseCase: GetTicketsUseCase;
  skipTicketUseCase: SkipTicketUseCase;
  startAttentionUseCase: StartAttentionUseCase;
}

export class TicketController {

  private readonly callNextTicketUseCase: CallNextTicketUseCase;
  private readonly completeTicketUseCase: CompleteTicketUseCase;
  private readonly createTicketUseCase: CreateTicketUseCase;
  private readonly getNextTicketByServiceCategoryIdUseCase: GetNextTicketByServiceCategoryIdUseCase;
  private readonly getNextTicketsByServiceCategoryIdUseCase: GetNextTicketsByServiceCategoryIdUseCase;
  private readonly getTicketByIdUseCase: GetTicketByIdUseCase;
  private readonly getTicketByWindowIdUseCase: GetTicketByWindowIdUseCase;
  private readonly getTicketsByBranchIdUseCase: GetTicketsByBranchIdUseCase;
  private readonly getTicketsUseCase: GetTicketsUseCase;
  private readonly skipTicketUseCase: SkipTicketUseCase;
  private readonly startAttentionUseCase: StartAttentionUseCase;

  constructor(useCases: UseCases) {
    this.callNextTicketUseCase = useCases.callNextTicketUseCase;
    this.completeTicketUseCase = useCases.completeTicketUseCase;
    this.createTicketUseCase = useCases.createTicketUseCase;
    this.getNextTicketByServiceCategoryIdUseCase = useCases.getNextTicketByServiceCategoryIdUseCase;
    this.getNextTicketsByServiceCategoryIdUseCase = useCases.getNextTicketsByServiceCategoryIdUseCase;
    this.getTicketByIdUseCase = useCases.getTicketByIdUseCase;
    this.getTicketByWindowIdUseCase = useCases.getTicketByWindowIdUseCase;
    this.getTicketsByBranchIdUseCase = useCases.getTicketsByBranchIdUseCase;
    this.getTicketsUseCase = useCases.getTicketsUseCase;
    this.skipTicketUseCase = useCases.skipTicketUseCase;
    this.startAttentionUseCase = useCases.startAttentionUseCase;
  }

  public getTickets = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const tickets = await this.getTicketsUseCase.execute(organizationId);
    return res.status(200).json(tickets);
  }

  public getTicketsByBranchId = async (req: Request, res: Response) => {
    const brancId = req.params.branchId as string;
    const tickets = await this.getTicketsByBranchIdUseCase.execute(brancId);
    return res.status(200).json(tickets);

  }
  
  public getNextTicketsByServiceCategoryId = async (req: Request, res: Response) => {
    const serviceCategoryId = req.params.serviceCategoryId as string;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const tickets = await this.getNextTicketsByServiceCategoryIdUseCase.execute(serviceCategoryId, limit);
    return res.status(200).json(tickets);
  }

  public getTicketById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const ticket = await this.getTicketByIdUseCase.execute(id);
    return res.status(200).json(ticket);
  }

  public getTicketByWindowId = async (req: Request, res: Response) => {
    const windowId = req.params.windowId as string;
    const ticket = await this.getTicketByWindowIdUseCase.execute(windowId);
    return res.status(200).json(ticket);
  }


  public getNextTicketByServiceCategoryId = async (req: Request, res: Response) => {
    const serviceCategoryId = req.params.serviceCategoryId as string;
    const ticket = await this.getNextTicketByServiceCategoryIdUseCase.execute(serviceCategoryId);
    return res.status(200).json(ticket);
  }

  public createTicket = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const branchId = req.params.branchId as string;
    const [error, createTicketDto] = CreateTicketDto.create(req.body);
    if(error) throw ResponseError.badRequest(error);
    const createdTicket = await this.createTicketUseCase.execute(organizationId, branchId, createTicketDto!);
    return res.status(201).json(createdTicket);
  }

  public callNextTicket = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const windowId = req.params.windowId as string;
    const attendedBy = req.user?.id as string;
    const nextTicket = await this.callNextTicketUseCase.execute(organizationId, windowId, attendedBy);
    return res.status(200).json(nextTicket);
  }

  public startAttention = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const windowId = req.params.windowId as string;
    const attendedTicket = await this.startAttentionUseCase.execute(organizationId, windowId);
    return res.status(200).json(attendedTicket);
  }

  public completeTicket = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const windowId = req.params.windowId as string;
    const completedTicket = await this.completeTicketUseCase.execute(organizationId, windowId);
    return res.status(200).json(completedTicket);
  }

  public skipTicket = async (req: Request, res: Response) => {
    const organizationId = req.user?.organizationId as string;
    const windowId = req.params.windowId as string;
    const skippedTicket = await this.skipTicketUseCase.execute(organizationId, windowId);
    return res.status(200).json(skippedTicket);
  }
}
