import pool from '../database/connection';
import {Category, CreateData} from '../entities/Category';

export class CategoryRepository {
  static async create(createData: CreateData): Promise<Category>{
    const {name, description} = createData;
    const result = await pool.query(
      'INSERT INTO categories(name, description) VALUES ($1, $2) RETURNING *', [name, description]
    );
    return result.rows[0];
  }

  static async findAll(): Promise<Category[]>{
    const result = await pool.query( 'SELECT * FROM categories ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: number): Promise<Category>{
    const result = await pool.query('SELECT * FROM category WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByProductId(productId: number): Promise<Category[]>{
    const result = await pool.query('SELECT c.* FROM categories c INNER JOIN products p ON p.category_id = c.id WHERE p.id = $1', [productId]);
    return result.rows;
  }

  static async update(id: number, fields: string[], values: any[]):
  Promise<Category>{
    const query = `UPDATE categories SET ${fields.join(', ')} WHERE id = $${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
  }

  static async delete(id: number): Promise<Category>{
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

}