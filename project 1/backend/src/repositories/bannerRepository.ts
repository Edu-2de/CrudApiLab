import pool from '../database/connection';
import { Banner, CreateBannerData } from '../entities/Banner';

export class BannerRepository {
  static async create(bannerData: CreateBannerData): Promise<Banner> {
    const { title, image_url, link_url } = bannerData;
    const result = await pool.query(
      'INSERT INTO banners(title, image_url, link_url, active) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, image_url, link_url || null, true] // active = true por padrão
    );
    return result.rows[0];
  }

  static async findAll(): Promise<Banner[]> {
    const result = await pool.query('SELECT * FROM banners ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: number): Promise<Banner | null> {
    const result = await pool.query('SELECT * FROM banners WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findActive(): Promise<Banner[]> {
    const result = await pool.query('SELECT * FROM banners WHERE active = true ORDER BY created_at DESC');
    return result.rows;
  }

  static async update(id: number, fields: string[], values: any[]): Promise<Banner> {
    const query = `UPDATE banners SET ${fields.join(', ')} WHERE id = $${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
  }

  static async delete(id: number): Promise<Banner> {
    const result = await pool.query('DELETE FROM banners WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async toggleActive(id: number): Promise<Banner> {
    const result = await pool.query(
      'UPDATE banners SET active = NOT active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async setActive(id: number, active: boolean): Promise<Banner> {
    const result = await pool.query(
      'UPDATE banners SET active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [active, id]
    );
    return result.rows[0];
  }
}