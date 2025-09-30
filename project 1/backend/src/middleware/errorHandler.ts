import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export function errorHandler(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
  const status = err instanceof AppError ? err.status : 500;
  res.status(status).json({
    message: err.message || 'Internal server error',
  });
}