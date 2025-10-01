import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export type UserRole = 'full_access' | 'limit_access' | 'user';

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }

      const userRole = req.user.role as UserRole;

      if (!allowedRoles.includes(userRole)) {
        throw new AppError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const requireAdmin = requireRole('full_access');
export const requireAdminOrModerator = requireRole('full_access', 'limit_access');
export const requireAnyRole = requireRole('full_access', 'limit_access', 'user');

export const requireOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const targetUserId = parseInt(req.params.userId);
    const currentUserId = req.user.id;
    const userRole = req.user.role as UserRole;

    if (userRole === 'full_access') {
      return next();
    }

    if (currentUserId === targetUserId) {
      return next();
    }

    throw new AppError('You can only access your own account', 403);
  } catch (error) {
    next(error);
  }
};
