import { Request, Response } from 'express';
import pool from '../database/connection';

const JWT_SECRET = process.env.JWT_SECRET || '';

export class BannerController {
  static add = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, image_url, link_url } = req.body;
      if (!title || !image_url || !link_url) {
        res.status(400).json({ message: 'Any of arguments of the banner is missing' });
        return;
      }

      const bannerResult = await pool.query(`SELECT * FROM banners WHERE image_url  = $1`, [image_url]);
      if (bannerResult.rows.length !== 0) {
        res.status(400).json({ message: 'There is already an image with this url' });
        return;
      }

      const bannerAdd = await pool.query(
        `INSERT INTO banner(title, image_url, link_url, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
        [title, image_url, link_url]
      );
    } catch (error) {}
  };
}
