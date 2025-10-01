import { Request, Response, NextFunction } from 'express';

export const combineMiddleware = (...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const executeMiddleware = (index: number) => {
      if (index >= middlewares.length) {
        return next();
      }

      const middleware = middlewares[index];
      middleware(req, res, (err?: any) => {
        if (err) {
          return next(err);
        }
        executeMiddleware(index + 1);
      });
    };

    executeMiddleware(0);
  };
};
