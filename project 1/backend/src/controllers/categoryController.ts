import { Request, Response } from 'express';
import pool from '../database/connection';

export class CategoryController {
  static addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        res.status(400).json({ message: 'Name or description is missing' });
        return;
      }

      const checkCategoryResult = await pool.query(`SELECT * FROM categories WHERE name = $1`, [name]);
      if (checkCategoryResult.rows.length !== 0) {
        res.status(400).json({ message: 'This category already exist' });
        return;
      }

      const addCategoryResult = await pool.query(
        `INSERT INTO categories(name, description, created_at) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *`,
        [name, description]
      );

      const category = addCategoryResult.rows[0];

      res.status(201).json({
        message: 'Category added successfully',
        category: category,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during banner adding',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static deleteCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryId = Number(req.params.categoryId);
      if (!categoryId) {
        res.status(400).json({ message: 'Category id is missing' });
        return;
      }

      const checkCategoryResult = await pool.query(`SELECT * FROM categories WHERE id = $1`, [categoryId]);
      if (checkCategoryResult.rows.length === 0) {
        res.status(400).json({ message: 'This id is not in the table' });
        return;
      }

      const category = checkCategoryResult.rows[0];

      const deleteCategoryResult = await pool.query(`DELETE FROM categories WHERE id = $1`, [categoryId]);

      res.status(200).json({
        message: 'Category deleted successfully',
        banner: category,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during delete banner',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryId = Number(req.params.categoryId);
      if (!categoryId) {
        res.status(400).json({ message: 'Category id is missing' });
        return;
      }

      const checkCategoryResult = await pool.query(`SELECT * FROM categories WHERE id = $1`, [categoryId]);
      if (checkCategoryResult.rows.length === 0) {
        res.status(400).json({ message: 'This id is not in the table' });
        return;
      }

      const category = checkCategoryResult.rows[0];

      res.json({
        message: 'Category retrieved successfully',
        banner: category,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching banner',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const checkCategoriesResult = await pool.query(`SELECT * FROM categories ORDER BY created_at DESC LIMIT 50`);
      if (checkCategoriesResult.rows.length === 0) {
        res.status(400).json({ message: 'No one categories added' });
        return;
      }

      const categories = checkCategoriesResult.rows;

      res.json({
        message: 'Categories retrieved successfully',
        categories: categories,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching categories',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static updateCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoryId = Number(req.params.categoryId);
      if (!categoryId) {
        res.status(400).json({ message: 'Category is missing' });
        return;
      }

      const { name, description } = req.body;
      if (name) {
        const checkNameResult = await pool.query(`SELECT * FROM categories WHERE name = $1`, [name]);
        if (checkNameResult.rows.length !== 0) {
          res.status(400).json({ message: 'This category already exist' });
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

      if (fields.length === 0) {
        res.status(400).json({ message: 'No fields to update' });
        return;
      }

      values.push(categoryId);
      const query = `UPDATE categories SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
      const result1 = await pool.query(query, values);

      res.json({
        message: 'Category updated successfully',
        category: result1.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during update user',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
