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
}