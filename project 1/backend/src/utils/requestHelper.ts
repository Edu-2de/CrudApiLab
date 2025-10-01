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

  static extractNumber(req: Request, key: string, required: boolean = true): number {
    const value = this.extractValue(req, key,  required);
    const numValue = Number(value);

    if(required && (isNaN(numValue) || numValue <= 0)){
      throw new AppError(`${key} must be a valid positive number`, 400);
    }

    return numValue;
  }
}