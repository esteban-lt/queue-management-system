import { Router } from 'express';

import { TicketRoutes } from '@tickets/presentation/routes/ticket-routes';
import { ServiceCategoryController } from '../controllers/service-category-controller';

import { ServiceCategoryRepositoryImplementation } from '@service-categories/infrastructure/repositories/service-category-repository-implementation';
import { PostgresServiceCategoryDatasource } from '@service-categories/infrastructure/datasources/postgres-service-category-datasource';

import { 
  CreateServiceCategoryUseCase, 
  GetServiceCategoriesUseCase, 
  GetServiceCategoryByIdUseCaseUseCase, 
  ToggleServiceCategoryByIdUseCase, 
  UpdateServiceCategoryByIdUseCase 
} from '@service-categories/application/use-cases';

export class ServiceCategoryRoutes {

  public static get controller() {
    const serviceCategoryDatasource = new PostgresServiceCategoryDatasource();
    const serviceCategoryRepository = new ServiceCategoryRepositoryImplementation(serviceCategoryDatasource);

    const contoller = new ServiceCategoryController(
      new GetServiceCategoriesUseCase(serviceCategoryRepository), 
      new GetServiceCategoryByIdUseCaseUseCase(serviceCategoryRepository), 
      new CreateServiceCategoryUseCase(serviceCategoryRepository), 
      new UpdateServiceCategoryByIdUseCase(serviceCategoryRepository),
      new ToggleServiceCategoryByIdUseCase(serviceCategoryRepository), 
    );

    return contoller;
  }

  public static get routes() {
    const router = Router();
    const serviceCategoryController = ServiceCategoryRoutes.controller;
    const ticketController = TicketRoutes.controller;

    router.get('/', serviceCategoryController.getServiceCategories);
    router.get('/:id', serviceCategoryController.getServiceCategoryById);

    router.post('/', serviceCategoryController.createServiceCategory);

    router.patch('/:id', serviceCategoryController.updateServiceCategoryById);
    router.patch('/:id/toggle', serviceCategoryController.toggleServiceCategoryById);

    // Tickets
    router.get('/:serviceCategoryId/tickets/next', ticketController.getNextTicketsByServiceCategoryId);
    router.get('/:serviceCategoryId/tickets/next-one', ticketController.getNextTicketByServiceCategoryId);

    return router;
  }
}
