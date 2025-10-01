import pool from '../database/connection';
import { User, CreateUserData, PublicUser } from '../entities/User';

export class UserRepository {
  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByIdPublic(id: number): Promise<PublicUser | null> {
    const result = await pool.query(
      'SELECT id, first_name, second_name, email, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  static async findAll(limit: number = 50): Promise<PublicUser[]> {
    const result = await pool.query(
      'SELECT id, first_name, second_name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
    return result.rows;
  }

  static async create(userData: CreateUserData): Promise<PublicUser> {
    const { first_name, second_name, email, password_hash, role } = userData;
    const result = await pool.query(
      'INSERT INTO users(first_name, second_name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, second_name, email, role, created_at',
      [first_name, second_name, email, password_hash, role || 'user']
    );
    return result.rows[0];
  }

  static async update(id: number, fields: string[], values: any[]): Promise<User> {
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${fields.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
  }

  static async delete(id: number): Promise<User> {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async emailExists(email: string, excludeId?: number): Promise<boolean> {
    let query = 'SELECT id FROM users WHERE email = $1';
    let params: any[] = [email];
    
    if (excludeId) {
      query += ' AND id != $2';
      params.push(excludeId);
    }
    
    const result = await pool.query(query, params);
    return result.rows.length > 0;
  }
}