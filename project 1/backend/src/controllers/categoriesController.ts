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

      const checkCategoriesResult = await pool.query(`SELECT * FROM categories WHERE name = $1`, [name]);
      if (checkCategoriesResult.rows.length !== 0) {
        res.status(400).json({ message: 'This category already exist' });
        return;
      }
    } catch (error) {}
  };
}
