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
      
    } catch (error) {}
  };
}
