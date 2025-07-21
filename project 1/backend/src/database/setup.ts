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

let setupExecuted = false;

export const setupDB = async () => {
  if (setupExecuted) {
    console.log('Database setup already completed, skipping');
    return;
  }

  try {
    console.log('Setting up database...');

    const tableExist = await checkIfTableExist();
    if (tableExist) {
      console.log('Database tables already exist, skipping');
      setupExecuted = true;
      return;
    }

    const schemaPath = path.join(__dirname, './sql/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    
  } catch (error) {}
};
