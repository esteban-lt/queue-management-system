import type { NextFunction, Request, Response } from 'express';
import { ResponseError } from './response-error';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ResponseError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err.message);
  return res.status(500).json({ error: 'internal server error' });
};
