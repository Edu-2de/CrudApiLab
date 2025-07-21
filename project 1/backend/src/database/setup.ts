import pool from './connection';
import fs from 'fs';
import path from 'path';

export const checkIfTableExist = async () => {
  try {
    const result = await pool.query(`
      SELECT EXISTS(
        SELECT FROM CrudApiProject1_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'users');
    `);
    return result.rows[0].exists;
  } catch (error) {
    return false;
  }
};
