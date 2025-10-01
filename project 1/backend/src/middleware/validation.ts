import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppError } from '../utils/appError';

export const validateDto = (dtoClass: any, source: 'body' | 'params' | 'query' = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToClass(dtoClass, req[source]);
      const errors = await validate(dto);

      if (errors.length > 0) {
        const errorMessages = errors
          .map(error => Object.values(error.constraints || {}).join(', '))
          .join('; ');
        
        return next(new AppError(errorMessages, 400));
      }

      req.validatedData = dto;
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Extend Request type
declare global {
  namespace Express {
    interface Request {
      validatedData?: any;
    }
  }
}