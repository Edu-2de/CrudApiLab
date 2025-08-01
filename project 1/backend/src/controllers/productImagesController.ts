import { Request, Response } from 'express';
import pool from '../database/connection';

export class ProductImagesController {
  static addProductImageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.productId);
      if (!productId) {
        res.status(400).json({ message: 'Product id is missing' });
        return;
      }

      const productCheckResult = await pool.query(`SELECT * FROM products WHERE id = $1`, [productId]);
      if (productCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'Product not found' });
        return;
      }

      const { image_url } = req.body;
      if (!image_url) {
        res.status(400).json({ message: 'image url is missing' });
        return;
      }

      const productImageResult = await pool.query(`INSERT INTO product_images(product_id, image_url) VALUES($1, $2)`, [
        productId,
        image_url,
      ]);

      res.status(201).json({
        message: 'Image added successfully',
        productImage: productImageResult.rows[0],
      });
    } catch (error) {
      
    }
  };
}
