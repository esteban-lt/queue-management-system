import { Router } from 'express';

import { AuthMiddleware } from '@auth/presentation/middlewares/auth-middleware';
import { AuthRoutes } from '@auth/presentation/routes/auth-routes';
import { BranchRoutes } from '@branches/presentation/routes/branch-routes';
import { OrganizationRoutes } from '@organizations/presentation/routes/organization-routes';
import { UserRoutes } from '@users/presentation/routes/user-routes';

export class Routes {

  public static get routes() {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/organizations', AuthMiddleware.verifyAuth, OrganizationRoutes.routes);
    router.use('/api/branches', AuthMiddleware.verifyAuth, BranchRoutes.routes);
    router.use('/api/users', AuthMiddleware.verifyAuth, UserRoutes.routes);

    return router;
  }
}
