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
        `INSERT INTO banners(title, image_url, link_url, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *`,
        [title, image_url, link_url]
      );
      res.status(201).json({
        message: 'Banner added successfully',
        banner: bannerAdd.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during banner adding',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static deleteBannerById = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerId = Number(req.params.bannerId);
      if (!bannerId) {
        res.status(400).json({ message: 'banner id is missing' });
        return;
      }

      const bannerExistsResult = await pool.query(`SELECT * FROM banners WHERE id = $1`, [bannerId]);
      if (bannerExistsResult.rows.length === 0) {
        res.status(400).json({ message: 'This id is not in the table' });
        return;
      }

      const bannerDeleteResult = await pool.query(`DELETE FROM banners WHERE id = $1`, [bannerId]);

      res.status(200).json({
        message: 'Banner deleted successfully',
        banner: bannerExistsResult.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during delete banner',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getBannerById = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerId = Number(req.params.bannerId);
      if(!bannerId){
        res.status(400).json({message: 'Banner id is missing'});
        return;
      };

      
    } catch (error) {

    }
  };
}
