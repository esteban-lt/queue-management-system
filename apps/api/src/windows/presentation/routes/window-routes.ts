import { Router } from 'express';

import { AuthMiddleware } from '@auth/presentation/middlewares/auth-middleware';
import { TicketRoutes } from '@tickets/presentation/routes/ticket-routes';
import { WindowController } from '../controllers/window-controller';

import { WindowRepositoryImplementation } from '@windows/infrastructure/repositories/window-repository-implementation';
import { PostgresWindowDatasource } from '@windows/infrastructure/datasources/postgres-window-datasource';

import { 
  CreateWindowUseCase, 
  GetWindowByIdUseCase, 
  GetWindowsUseCase, 
  UpdateWindowByIdUseCase 
} from '@windows/application/use-cases';

export class WindowRoutes {

  public static get controller() {

    const datasource = new PostgresWindowDatasource();
    const repository = new WindowRepositoryImplementation(datasource);

    const controller = new WindowController(
      new GetWindowsUseCase(repository),
      new GetWindowByIdUseCase(repository),
      new CreateWindowUseCase(repository),
      new UpdateWindowByIdUseCase(repository),
    );

    return controller;
  }

  public static get routes(): Router {
    const router = Router();
    const windowController = WindowRoutes.controller;
    const ticketController = TicketRoutes.controller;

    router.get('/', windowController.getWindows);
    router.get('/:id', windowController.getWindowById);

    router.post('/', windowController.createWindow);

    router.patch('/:id', windowController.updateWindowById);

    // Tickets
    router.get('/:windowId/tickets', ticketController.getTicketByWindowId);

    router.post('/:windowId/tickets/call-next', AuthMiddleware.verifyRole('operator', 'manager'), ticketController.callNextTicket);
    router.post('/:windowId/tickets/start-attention', AuthMiddleware.verifyRole('operator', 'manager'), ticketController.startAttention);
    router.post('/:windowId/tickets/complete', AuthMiddleware.verifyRole('operator', 'manager'), ticketController.completeTicket);
    router.post('/:windowId/tickets/skip', AuthMiddleware.verifyRole('operator', 'manager'), ticketController.skipTicket);

    return router;
  }
}
