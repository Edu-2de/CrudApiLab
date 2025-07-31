import { Request, Response } from 'express';
import pool from '../database/connection';

export class ProductController {
  static add = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, price, stock, category, image_url } = req.body;
      if (!name || !description || !price || !stock || !category || !image_url) {
        res.status(400).json({ message: 'Any of arguments is missing' });
        return;
      }

      const productNameCheckResult = await pool.query(`SELECT * FROM products WHERE name = $1`, [name]);
      if (productNameCheckResult.rows.length !== 0) {
        res.status(400).json({ message: 'This product already exist' });
        return;
      }

      if (price <= 0 || price > 9999.99) {
        res.status(400).json({ message: 'Invalid price' });
        return;
      }

      if (stock <= 0 || stock > 9999) {
        res.status(400).json({ message: 'Invalid stock' });
        return;
      }

      const categoryCheckResult = await pool.query(`SELECT * FROM categories WHERE name = $1`, [category]);
      if (categoryCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'This category not exist' });
        return;
      }

      const categoryResult = categoryCheckResult.rows[0];
      const categoryId = categoryResult.id;

      const productAddResult = await pool.query(
        `INSERT INTO products(name, description, price, stock, category_id, image_url, created_at) VALUES($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
        [name, description, price, stock, categoryId, image_url]
      );

      res.status(201).json({
        message: 'Product added successfully',
        product: productAddResult.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during banner adding',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
