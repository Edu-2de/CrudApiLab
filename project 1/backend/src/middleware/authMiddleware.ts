import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request{
  user?:{
    id: number;
    email: string;
    role: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || '';

export class AuthMiddleware {
  static authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
      res.status(401).json({ message: 'Access denied. No token provided.',});
      return;
    }

    try{
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      req.user = decoded;
      next();
    }catch(error){
      res.status(403).json({
        message: 'Invalid token.',
      });
    }
  }
}