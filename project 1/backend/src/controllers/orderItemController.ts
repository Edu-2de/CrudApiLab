import { Request, Response } from 'express';
import pool from '../database/connection';

export class OrderItemController {
  static addOrderItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = Number(req.params.orderId);
      if (orderId) {
        res.status(400).json({ message: 'Order id is missing' });
        return;
      }

      const orderCheckResult = await pool.query(`SELECT * FROM orders WHERE id = $1`, [orderId]);
      if (orderCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'Order not found' });
        return;
      }

      
    } catch (error) {}
  };
}
