import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '../exceptions';

export const RoleGuard = async (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user.role !== 'admin') {
    throw new ForbiddenException();
  }
  next();
};
