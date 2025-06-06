import { Request, Response, NextFunction } from 'express';
import { users } from '../data/db';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  const user = users.find(u => u.id === token);
  if (!user) return res.status(401).json({ message: 'Invalid token' });

  // @ts-ignore
  req.user = user;
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const user = req.user;
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}