import { Request, Response } from 'express';
import jwt from 'bcryptjs';
import pool from '../database/connection';

const JWT_SECRET = process.env.JWT_SECRET || '';

export class AuthController {
  static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email or password is missing!' });
        return;
      }
      const result = await pool.query(
        
      )
    } catch (error) {}
  };
}
