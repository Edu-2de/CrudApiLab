import { Request, Response } from 'express';
import pool from '../database/connection';

export class BannerController {
  static addBanner = async (req: Request, res: Response): Promise<void> => {
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
      if (!bannerId) {
        res.status(400).json({ message: 'Banner id is missing' });
        return;
      }

      const bannerGetResult = await pool.query(`SELECT * FROM banners WHERE id = $1`, [bannerId]);
      if (bannerGetResult.rows.length === 0) {
        res.status(400).json({ message: 'This id is not in the table' });
        return;
      }

      const banner = bannerGetResult.rows[0];

      res.json({
        message: 'Banner retrieved successfully',
        banner: banner,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching banner',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getActiveBanners = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerCheckResult = await pool.query(
        `SELECT * FROM banners Where active = TRUE ORDER BY created_at DESC LIMIT 50`
      );
      if (bannerCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'No one banner active' });
        return;
      }

      const banners = bannerCheckResult.rows;

      res.json({
        message: 'Banners retrieved successfully',
        banners: banners,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching banners',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static getAllBanners = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerCheckResult = await pool.query(`SELECT * FROM banners ORDER BY created_at DESC LIMIT 50`);
      if (bannerCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'No  banners added' });
        return;
      }
      const banners = bannerCheckResult.rows;

      res.json({
        message: 'Banners retrieved successfully',
        banners: banners,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching banners',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static activeBannerById = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerId = Number(req.params.bannerId);
      if (!bannerId) {
        res.status(400).json({ message: 'Banner id is missing' });
        return;
      }

      const bannerCheckResult = await pool.query(`SELECT * FROM banners WHERE id = $1`, [bannerId]);
      if (bannerCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'This id is not in the table' });
        return;
      }

      const banner = bannerCheckResult.rows[0];

      if (banner.active === true) {
        res.status(400).json({ message: 'Banner is already active' });
        return;
      }

      const bannerActiveResult = await pool.query(`UPDATE banners SET active = TRUE WHERE id = $1 RETURNING *`, [
        bannerId,
      ]);

      res.json({
        message: 'Banner updated successfully',
        banner: bannerActiveResult.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during activating banner',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  static disableBannerById = async (req: Request, res: Response): Promise<void> => {
    try {
      const bannerId = Number(req.params.bannerId);
      if (!bannerId) {
        res.status(400).json({ message: 'Banner id is missing' });
        return;
      }

      const bannerCheckResult = await pool.query(`SELECT * FROM banners WHERE id = $1`, [bannerId]);
      if (bannerCheckResult.rows.length === 0) {
        res.status(400).json({ message: 'This id is not in the table' });
        return;
      }

      const banner = bannerCheckResult.rows[0];

      if (banner.active === false) {
        res.status(400).json({ message: 'Banner is already disable' });
        return;
      }

      const bannerDisableResult = await pool.query(`UPDATE banners SET active = FALSE WHERE id = $1 RETURNING *`, [
        bannerId,
      ]);

      const bannerDisable = bannerDisableResult.rows[0];

      res.json({
        message: 'Banner updated successfully',
        banner: bannerDisable,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during disable banner',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
