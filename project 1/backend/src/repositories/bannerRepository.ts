import pool from '../database/connection';
import {Banner} from '../entities/Banner';

export class BannerRepository{
  static async create(banner: Banner): Promise<Banner> {
    const {title, image_url, link_url} = banner;
    const result = await pool.query(
      ' INSERT INTO banners(title, image_url, link_url) VALUES ($1, $2, $3) RETURNING *', [title, image_url, link_url]
    );
    return result.rows[0];
  }

  static async update(id: number, fields: string[], values: any[]): Promise<Banner>{
    const query = `UPDATE banners SET ${fields.join(', ')} WHERE id = $${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
  }

  
}
