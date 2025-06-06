import { NextFunction, Request, Response } from 'express';
import logger from '../logger/pino.logger';

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  res.status(500).json({
    status: 'error',
    message: err.message ?? 'Неизвестная ошибка',
  });
};
