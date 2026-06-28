import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth-middleware';
import { AuthController } from '../controllers/auth-controller';

import { OrganizationRepositoryImplementation } from '@organizations/infrastructure/repositories/organization-repository-implementation';
import { PostgresOrganizationDatasource } from '@organizations/infrastructure/datasources/postgres-organization-datasource';

import { PostgresAuthDatasource } from '@auth/infrastructure/datasources/postgres-auth-datasource';
import { AuthRepositoryImplementation } from '@auth/infrastructure/repositories/auth-repository-implementation';

import { LoginUseCase } from '@auth/application/use-cases/login-use-case';
import { RegisterUseCase } from '@auth/application/use-cases/register-use-case';

export class AuthRoutes {

  public static get controller() {
    const authDatasource = new PostgresAuthDatasource();
    const organizationDatasource = new PostgresOrganizationDatasource();

    const authRepository = new AuthRepositoryImplementation(authDatasource);
    const organizationRepository = new OrganizationRepositoryImplementation(organizationDatasource);

    const loginUseCase = new LoginUseCase(authRepository);
    const registerUserUseCase = new RegisterUseCase(authRepository, organizationRepository)

    const controller = new AuthController(
      loginUseCase,
      registerUserUseCase,
    );

    return controller;
  }

  public static get routes() {
    const router = Router();
    const authController = AuthRoutes.controller;

    router.get('/me', AuthMiddleware.verifyAuth, authController.me);
    
    router.post('/login', authController.login);
    router.post('/register', authController.register);

    return router;
  }
}
