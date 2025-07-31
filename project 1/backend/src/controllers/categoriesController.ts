import { Request, Response } from 'express';
import pool from '../database/connection';

export class CategoriesController {
  static add = async (req: Request, res: Response): Promise<void> => {
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
}
