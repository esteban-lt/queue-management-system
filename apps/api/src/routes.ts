import { Router } from 'express';

export class Routes {

  public static get routes() {
    const router = Router();

    router.get('/api/test', (_req, res) => res.json({ ok: true }));

    return router;
  }
}
