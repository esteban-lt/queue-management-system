import { Router } from 'express';

import { OrganizationController } from '../controllers/organization-controller';

import { OrganizationRepositoryImplementation } from '@organizations/infrastructure/repositories/organization-repository-implementation';
import { PostgresOrganizationDatasource } from '@organizations/infrastructure/datasources/postgres-organization-datasource';

import { 
  GetOrganizationsUseCase, 
  GetOrganizationByIdUseCase, 
  UpdateOrganizationByIdUseCase 
} from '@organizations/application/use-cases';

export class OrganizationRoutes {

  public static get controller() {
    const organizationDatasource = new PostgresOrganizationDatasource();
    const organizationRepository = new OrganizationRepositoryImplementation(organizationDatasource);

    const getOrganizationsUseCase = new GetOrganizationsUseCase(organizationRepository);
    const getOrganizationByIdUseCase = new GetOrganizationByIdUseCase(organizationRepository);
    const updateOrganizationByIdUseCase = new UpdateOrganizationByIdUseCase(organizationRepository);

    const controller = new OrganizationController(
      getOrganizationsUseCase,
      getOrganizationByIdUseCase,
      updateOrganizationByIdUseCase,
    );

    return controller;
  }

  public static get routes() {
    const router = Router();
    const organizationController = OrganizationRoutes.controller;

    router.get('/', organizationController.getOrganizations);
    router.get('/:id', organizationController.getOrganizationById);

    router.patch('/:id', organizationController.updateOrganizationById);

    return router;
  }
}
