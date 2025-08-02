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
        `INSERT INTO orders(user_id, total, status, created_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *`,
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
  static updateOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = Number(req.params.orderId);
      if (!orderId) {
        res.status(400).json({ message: 'Order id is missing' });
        return;
      }

      const { status } = req.body;
      if (!status) {
        res.status(400).json({ message: 'Status is missing' });
        return;
      }

      if (
        status !== 'pending' ||
        status !== 'paid' ||
        status !== 'shipped' ||
        status !== 'delivered' ||
        status !== 'canceled'
      ) {
        res.status(400).json({ message: 'Invalid status' });
        return;
      }

      
    } catch (error) {}
  };
}
