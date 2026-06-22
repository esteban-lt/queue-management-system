import { Router } from 'express';
import { AuthRoutes } from './auth/presentation/routes/auth-routes';

export class Routes {

  public static get routes() {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);

    return router;
  }
}
