import { Request } from 'express';
import { AppError } from './appError';

export class RequestHelper{
  static extractValue(req: Request, key: string, required: boolean = true): any{
    const value = req.params[key] || req.body[key] || req.query[key];

    if (required && (value === undefined || value === null || value === '')){
      throw new AppError(`${key} is required`, 400);
    }

    return value;
  }

  static 
}