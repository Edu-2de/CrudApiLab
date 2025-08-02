import { Request, Response } from 'express';
import pool from '../database/connection';

export class ProductController {
  static addProduct = async (req: Request, res: Response): Promise<void> => {
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
        `INSERT INTO products(name, description, price, stock, category_id, image_url, created_at) VALUES($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *`,
        [name, description, price, stock, categoryId, image_url]
      );

      res.status(201).json({
        message: 'Product added successfully',
        product: productAddResult.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during product adding',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static deleteProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.productId);
      if (!productId) {
        res.status(400).json({ message: 'Product id is missing' });
        return;
      }

      const productCheckResult = await pool.query(`SELECT * FROM products WHERE id = $1`, [productId]);
      if (productCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'This id is not in the table' });
        return;
      }

      const product = productCheckResult.rows[0];

      const productDeleteResult = await pool.query(`DELETE FROM products WHERE id = $1`, [productId]);

      res.status(200).json({
        message: 'Product deleted successfully',
        product: product,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during delete product',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.productId);
      if (!productId) {
        res.status(400).json({ message: 'Product id is missing' });
        return;
      }

      const productCheckResult = await pool.query(`SELECT * FROM products WHERE id = $1`, [productId]);
      if (productCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'This id is not in the table' });
        return;
      }

      const product = productCheckResult.rows[0];

      res.json({
        message: 'Product retrieved successfully',
        product: product,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching product',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const productCheckResult = await pool.query(`SELECT * FROM products ORDER BY created_at DESC LIMIT 50`);
      if (productCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'No products added' });
        return;
      }

      const products = productCheckResult.rows;

      res.json({
        message: 'Products retrieved successfully',
        products: products,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching products',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category } = req.body;
      if (!category) {
        res.status(400).json({ message: 'Category is missing' });
        return;
      }

      const categoryCheckResult = await pool.query(`SELECT * FROM categories WHERE name = $1`, [category]);
      if (categoryCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'This category does not exist' });
        return;
      }

      const categoryResult = categoryCheckResult.rows[0];
      const categoryId = categoryResult.id;

      const productsCategoryResult = await pool.query(`SELECT * FROM products WHERE category_id = $1 LIMIT 50`, [
        categoryId,
      ]);

      if (productsCategoryResult.rows.length === 0) {
        res.status(400).json({ message: 'No products found for this category' });
        return;
      }

      const productsCategory = productsCategoryResult.rows;

      res.json({
        message: 'Products retrieved successfully',
        products: productsCategory,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching products',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static updateProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.productId);
      if (!productId) {
        res.status(400).json({ message: 'Product id is missing' });
        return;
      }

      const productCheckResult = await pool.query(
        `
        SELECT 
          p.*,
          c.*
        FROM products p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE p.id = $1`,
        [productId]
      );
      if (productCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'Product not found' });
        return;
      }

      const { name, description, price, stock, category, image_url } = req.body;
      if (price) {
        if (price <= 0 || price >= 9999.99) {
          res.status(400).json({ message: 'Invalid price' });
          return;
        }
      }
      if (stock) {
        if (stock <= 0 || stock > 9999) {
          res.status(400).json({ message: 'Invalid stock quantity' });
          return;
        }
      }
      if (image_url) {
        const imageCheckResult = await pool.query(`SELECT * FROM products WHERE image_url = $1 AND id != $2`, [
          image_url,
          productId,
        ]);
        if (imageCheckResult.rows.length !== 0) {
          res.status(400).json({ message: 'This image is already used by another product' });
          return;
        }

        const productImageCheckResult = await pool.query(`SELECT * FROM product_images WHERE image_url = $1`, [
          image_url,
        ]);
        if (productImageCheckResult.rows.length !== 0) {
          res.status(400).json({ message: 'This image is already used by another product' });
          return;
        }
      }

      const fields = [];
      const values = [];
      let idx = 1;

      if (name) {
        fields.push(`name = $${idx++}`);
        values.push(name);
      }
      if (description) {
        fields.push(`description = $${idx++}`);
        values.push(description);
      }
      if (price) {
        fields.push(`price = $${idx++}`);
        values.push(price);
      }
      if (stock) {
        fields.push(`stock = $${idx++}`);
        values.push(stock);
      }
      if (category) {
        const categoryCheckResult = await pool.query(`SELECT * FROM categories WHERE name = $1`, [category]);
        if (categoryCheckResult.rows.length === 0) {
          res.status(400).json({ message: 'This category not exists' });
          return;
        }
        const categoryResult = categoryCheckResult.rows[0];
        const category_id = categoryResult.id;
        fields.push(`category_id = $${idx++}`);
        values.push(category_id);
      }
      if (image_url) {
        fields.push(`image_url = $${idx++}`);
        values.push(image_url);
      }
      if (fields.length === 0) {
        res.status(400).json({ message: 'No fields to update' });
        return;
      }

      values.push(productId);

      const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
      const result = await pool.query(query, values);

      res.json({
        message: 'Product updated successfully',
        product: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating product',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
