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
      
    } catch (error) {}
  };
}
