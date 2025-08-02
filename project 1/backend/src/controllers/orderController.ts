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
  static getOrdersByUser = async (req: any, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      if (!userId) {
        res.status(400).json({ message: 'User id is missing' });
        return;
      }

      const ordersCheckResult = await pool.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50 `,
        [userId]
      );
      if (ordersCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'No orders found' });
        return;
      }

      const orders = ordersCheckResult.rows;

      res.json({
        message: 'Orders retrieved successfully',
        orders: orders,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching orders',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        res.status(400).json({ message: 'User id is missing' });
        return;
      }

      const ordersCheckResult = await pool.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50 `,
        [userId]
      );
      if (ordersCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'No orders found' });
        return;
      }

      const orders = ordersCheckResult.rows;

      res.json({
        message: 'Orders retrieved successfully',
        orders: orders,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching orders',
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

      const orderCheckResult = await pool.query(`SELECT * FROM orders WHERE id = $1`, [orderId]);
      if (orderCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'Order not found' });
        return;
      }

      const orderResult = orderCheckResult.rows[0];

      const { status } = req.body;
      if (orderResult.status === status) {
        res.status(400).json({ message: 'This already is the status for this order' });
        return;
      }

      if (!status) {
        res.status(400).json({ message: 'Status is missing' });
        return;
      }

      const validStatuses = ['pending', 'paid', 'shipped', 'delivered', 'canceled'];
      if (!validStatuses.includes(status)) {
        res.status(400).json({ message: 'Invalid status' });
        return;
      }

      const orderNewResult = await pool.query(`UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`, [
        status,
        orderId,
      ]);
      const orderNew = orderNewResult.rows[0];

      res.json({
        message: 'Order updated successfully',
        order: orderNew,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating order',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static deleteOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = Number(req.params.orderId);
      if (!orderId) {
        res.status(400).json({ message: 'Order id is missing' });
        return;
      }

      const orderCheckResult = await pool.query(`SELECT * FROM orders WHERE id = $1`, [orderId]);
      if (orderCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'Order not found' });
        return;
      }

      const order = orderCheckResult.rows[0];

      const orderDeleteResult = await pool.query(`DELETE FROM orders WHERE id = $1`, [orderId]);
      res.status(200).json({
        message: 'Order deleted successfully',
        order: order,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting order',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
