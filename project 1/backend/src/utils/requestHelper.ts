import { Request } from 'express';
import { AppError } from './appError';

export class RequestHelper {
  static extractValue(req: Request, key: string, required: boolean = true): any {
    const value = req.params[key] || req.body[key] || req.query[key];

    if (required && (value === undefined || value === null || value === '')) {
      throw new AppError(`${key} is required`, 400);
    }

    return value;
  }

  static extractNumber(req: Request, key: string, required: boolean = true): number {
    const value = this.extractValue(req, key, required);
    const numValue = Number(value);

    if (required && (isNaN(numValue) || numValue <= 0)) {
      throw new AppError(`${key} must be a valid positive number`, 400);
    }

    return numValue;
  }

  static extractMultiple( req: Request, keys: Array<{ key: string; required?: boolean; type?: 'string' | 'number' }>
  ): Record<string, any> {
    const result: Record<string, any> = {};

    for (const { key, required = false, type = 'string' } of keys) {
      if (type === 'number') {
        result[key] = this.extractNumber(req, key, required);
      } else {
        result[key] = this.extractValue(req, key, required);
      }
    }

    return result;
  }

  
}
