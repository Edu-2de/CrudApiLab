import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: {
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

    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({
        message: 'Invalid token.',
      });
    }
  };
  static requireAdmin(req: any, res: any, next: any) {
    console.log('🔍 Verifying....');
    console.log('Headers:', req.headers.authorization);
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      console.log('❌ Token not found');
      return res.status(401).json({ message: 'Access token required' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      console.log('👤 User: ', decoded);
      
      if (decoded.role !== 'full_access' && decoded.role !== 'limit_access') {
        console.log('❌ Role:', decoded.role);
        return res.status(403).json({ message: 'Admin access required' });
      }
      
      req.user = decoded;
      console.log('✅ Admin access accepted');
      next();
    } catch (error) {
      console.log('❌ Invalid Token:', error);
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
}