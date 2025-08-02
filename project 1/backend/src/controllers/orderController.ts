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

      const orderResult = await pool.query(
        `INSERT INTO orders(user_id, total, status, created_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP)`,
        [userId, total, 'pending']
      );

      const order = orderResult.rows[0];

      res.status(201).json({
        message: 'Order added successfully',
        order: order,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during order adding',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
