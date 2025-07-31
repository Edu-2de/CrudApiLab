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

      const checkCategorieResult = await pool.query
    } catch (error) {}
  };
}
