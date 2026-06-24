import type { NextFunction, Request, Response } from 'express';
import { Jwt } from '@plugins/index';
import { prisma } from '@lib/prisma';
import type { Role } from '../../domain/types/role';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        organizationId: string;
        role: Role;
      }
    }
  }
}

export class AuthMiddleware {

  public static verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'missing or invalid token' });

    const token = authHeader.split(' ')[1];
    const payload = await Jwt.verify<{ id: string }>(token!);
    if (!payload) return res.status(401).json({ error: 'invalid or expired token' });

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user || !user.isActive) return res.status(401).json({ error: 'unauthorized' });

    req.user = {
      id: user.id,
      organizationId: user.organizationId,
      role: user.role,
    };
    
    next();
  }
}
