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

      const productImageResult = await pool.query(`INSERT INTO product_images(product_id, image_url) VALUES($1, $2) RETURNING *`, [
        productId,
        image_url,
      ]);

      res.status(201).json({
        message: 'Image added successfully',
        productImage: productImageResult.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during image adding',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static deleteProductImageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const imageProductId = Number(req.params.imageProductId);
      if (!imageProductId) {
        res.status(400).json({ message: 'image product id is missing' });
        return;
      }

      const productImageCheckResult = await pool.query(`SELECT * FROM product_images WHERE id = $1`, [imageProductId]);
      if (productImageCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'image product not found' });
        return;
      }

      const imageProduct = productImageCheckResult.rows[0];

      const productImageResult = await pool.query(`DELETE FROM product_images WHERE id = $1`, [imageProductId]);

      res.status(200).json({
        message: 'Image product deleted successfully',
        productImage: imageProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during delete image product',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getProductImagesById = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.productId);
      if (!productId) {
        res.status(400).json({ message: 'Product id is missing' });
        return;
      }

      const imagesProductCheckResult = await pool.query(`SELECT * FROM product_images WHERE product_id = $1`, [
        productId,
      ]);
      if (imagesProductCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'No images for this product found' });
        return;
      }

      const productImage = imagesProductCheckResult.rows[0];

      res.json({
        message: 'Product images retrieved successfully',
        productImage: productImage,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching product images',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static updateProductImageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const imageProductId = Number(req.params.imageProductId);
      if (!imageProductId) {
        res.status(400).json({ message: 'image product id is missing' });
        return;
      }

      const productImageCheckResult = await pool.query(`SELECT * FROM product_images WHERE id = $1`, [imageProductId]);
      if (productImageCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'image product not found' });
        return;
      }

      const { image_url } = req.body;

      const productImageResult = await pool.query(
        `UPDATE product_images SET image_url = $1 WHERE id = $2 RETURNING *`,
        [image_url, imageProductId]
      );
      const productImage = productImageCheckResult.rows[0];

      res.json({
        message: 'Image product updated successfully',
        productImage: productImageResult.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during update image product',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
