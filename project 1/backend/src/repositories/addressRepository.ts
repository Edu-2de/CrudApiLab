import pool from '../database/connection';
import {Address, CreateAddressData} from '../entities/Address';

export class AddressRepository{
  static async create(addressData: CreateAddressData): Promise<Address>{
    const {user_id, address_line1, address_line2, city, state, postal_code, country} = addressData;
    const result = await pool.query(
      'INSERT INTO user_addresses(user_id, address_line1, address_line2, city, state, postal_code, country) VALUES($1, $2, $3, $4, $5, $6, $7) ', [user_id, address_line1, address_line2, city, state, postal_code, country]
    );
    return result.rows[0];
  }

  static async findAll(): Promise<Address[]>{
    const result = await pool.query('SELECT * FROM user_addresses ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: number): Promise<Address | null> {
    const result = await pool.query('SELECT * FROM user_addresses WHERE id = $1', [id]);
    return result.rows[0] || null ;
  }

  static async findByUserId(userId: number): Promise<Address | null>{
    const result = await pool.query('SELECT * FROM user_addresses WHERE user_id = $1', [userId]);
    return result.rows[0] || null;
  }

  static async update(id: number, fields: string[], values: any[]): Promise<Address>{
    const query = `UPDATE user_addresses SET ${fields.join(', ')} WHERE id = $${fields.length + 1} RETURNING *`;

    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
  }
  
}