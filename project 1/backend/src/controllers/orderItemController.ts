import { Request, Response } from 'express';
import pool from '../database/connection';

export class OrderItemController {
  static addOrderItem = async (req: Request, res: Response): Promise<void> => {
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

      const { product_id, quantity } = req.body;
      if (!product_id || !quantity) {
        res.status(400).json({ message: 'Product id or quantity is missing' });
        return;
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        res.status(400).json({ message: 'Quantity must be a positive integer' });
        return;
      }

      const productCheckResult = await pool.query(`SELECT * FROM products WHERE id = $1`, [product_id]);
      if (productCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'Product Not found' });
        return;
      }

      const product = productCheckResult.rows[0];
      if (quantity > product.stock) {
        res.status(400).json({ message: 'Quantity is bigger than stock' });
        return;
      }

      const price = product.price * quantity;

      const orderItemResult = await pool.query(
        `INSERT INTO order_items(order_id, product_id, quantity, price) VALUES($1, $2, $3, $4) RETURNING *`,
        [orderId, product_id, quantity, price]
      );

      const orderItem = orderItemResult.rows[0];

      res.status(201).json({
        message: 'Item added to order successfully',
        orderItem: orderItem,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during item adding',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
