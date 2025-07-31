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

      if (stock <= 0 || stock > 9999){
        res.status(400).json({message: 'Invalid stock'});
        return;
      }

      
    } catch (error) {}
  };
}
