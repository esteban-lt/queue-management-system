import { Router } from 'express';

import { TicketController } from '../controllers/ticket-controller';

import { BranchRepositoryImplementation } from '@branches/infrastructure/repositories/branch-repository-implementation';
import { PostgresBranchDatasource } from '@branches/infrastructure/datasources/postgres-branch-datasource';
import { TicketRepositoryImplementation } from '@tickets/infrastructure/repositories/ticket-repository-implementation';
import { PostgresTicketDatasource } from '@tickets/infrastructure/datasources/postgres-ticket-datasource';
import { WindowRepositoryImplementation } from '@windows/infrastructure/repositories/window-repository-implementation';
import { PostgresWindowDatasource } from '@windows/infrastructure/datasources/postgres-window-datasource';
import { ServiceCategoryRepositoryImplementation } from '@service-categories/infrastructure/repositories/service-category-repository-implementation';
import { PostgresServiceCategoryDatasource } from '@service-categories/infrastructure/datasources/postgres-service-category-datasource';

import { 
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


export class TicketRoutes {

  public static get controller(): TicketController {

    const branchRepository = new BranchRepositoryImplementation(new PostgresBranchDatasource());
    const serviceCategoryRepository = new ServiceCategoryRepositoryImplementation(new PostgresServiceCategoryDatasource());
    const ticketRepository = new TicketRepositoryImplementation(new PostgresTicketDatasource());
    const windowRepository = new WindowRepositoryImplementation(new PostgresWindowDatasource());

    const controller = new TicketController({
      callNextTicketUseCase: new CallNextTicketUseCase(branchRepository, ticketRepository, windowRepository),
      completeTicketUseCase: new CompleteTicketUseCase(branchRepository, ticketRepository, windowRepository),
      createTicketUseCase: new CreateTicketUseCase(ticketRepository, branchRepository, serviceCategoryRepository),
      getNextTicketByServiceCategoryIdUseCase: new GetNextTicketByServiceCategoryIdUseCase(ticketRepository),
      getNextTicketsByServiceCategoryIdUseCase: new GetNextTicketsByServiceCategoryIdUseCase(ticketRepository),
      getTicketByIdUseCase: new GetTicketByIdUseCase(ticketRepository),
      getTicketByWindowIdUseCase: new GetTicketByWindowIdUseCase(ticketRepository),
      getTicketsByBranchIdUseCase: new GetTicketsByBranchIdUseCase(ticketRepository),
      getTicketsUseCase: new GetTicketsUseCase(ticketRepository),
      skipTicketUseCase: new SkipTicketUseCase(branchRepository, ticketRepository, windowRepository),
      startAttentionUseCase: new StartAttentionUseCase(branchRepository, ticketRepository, windowRepository),
    });

    return controller;
  }

  public static get routes(): Router {
    const router = Router();
    const ticketController = TicketRoutes.controller;

    router.get('/', ticketController.getTickets);
    router.get('/:id', ticketController.getTicketById);

    return router;
  }
}
