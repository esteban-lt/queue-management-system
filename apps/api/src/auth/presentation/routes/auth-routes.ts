import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { LoginUseCase } from '../../application/use-cases/login-use-case';
import { AuthRepositoryImplementation } from '../../infrastructure/repositories/auth-repository-implementation';
import { PostgresAuthDatasource } from '../../infrastructure/datasources/postgres-auth-datasource';
import { RegisterUserUseCase } from '../../application/use-cases/register-user-use-case';
import { PostgresOrganizationDatasource } from '../../../organizations/infrastructure/datasources/postgres-organization-datasource';
import { OrganizationRepositoryImplementation } from '../../../organizations/infrastructure/repositories/organization-repository-implementation';
import { AuthMiddleware } from '../middlewares/auth-middleware';

export class AuthRoutes {

  public static get routes() {
    const router = Router();

    const authDatasource = new PostgresAuthDatasource();
    const organizationDatasource = new PostgresOrganizationDatasource();

    const authRepository = new AuthRepositoryImplementation(authDatasource);
    const organizationRepository = new OrganizationRepositoryImplementation(organizationDatasource);

    const loginUseCase = new LoginUseCase(authRepository);
    const registerUserUseCase = new RegisterUserUseCase(authRepository, organizationRepository)

    const authController = new AuthController(
      loginUseCase,
      registerUserUseCase,
    );

    router.get('/me', AuthMiddleware.verifyAuth, authController.me);
    router.post('/login', authController.login);
    router.post('/register', authController.register);

    return router;
  }
}
