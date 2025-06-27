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

  if (err.code) {
    res.status(err.code).json({
      status: err.code,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: err.code,
    message: 'Internal Server Error',
  });
};
