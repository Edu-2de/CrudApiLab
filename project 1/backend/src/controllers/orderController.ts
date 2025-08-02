import { Request, Response } from 'express';
import pool from '../database/connection';

export class OrderController {
  static addOrder = async (req: any, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      if (!userId) {
        res.status(400).json({ message: 'you need to be logged in for this action' });
        return;
      }

      const { total } = req.body;
      if (!total) {
        res.status(400).json({ message: 'Total is missing' });
        return;
      }
    } catch (error) {}
  };
}
