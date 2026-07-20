import { Router } from 'express';

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

    router.get('/', windowController.getWindows);
    router.get('/:id', windowController.getWindowById);

    router.post('/', windowController.createWindow);

    router.patch('/:id', windowController.updateWindowById);

    return router;
  }
}
