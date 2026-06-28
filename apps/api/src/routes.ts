import { Router } from 'express';

import { AuthRoutes } from '@auth/presentation/routes/auth-routes';
import { BranchRoutes } from '@branches/presentation/routes/branch-routes';
import { OrganizationRoutes } from '@organizations/presentation/routes/organization-routes';
import { AuthMiddleware } from '@auth/presentation/middlewares/auth-middleware';

export class Routes {

  public static get routes() {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/organizations', AuthMiddleware.verifyAuth, OrganizationRoutes.routes);
    router.use('/api/branches', AuthMiddleware.verifyAuth, BranchRoutes.routes);

    return router;
  }
}
