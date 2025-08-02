import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../database/connection';

const JWT_SECRET = process.env.JWT_SECRET || '';

export class AuthController {
  static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Email or password is missing!' });
        return;
      }
      const result = await pool.query(`SELECT * FROM users WHERE email  = $1`, [email]);
      if (result.rows.length == 0) {
        res.status(400).json({ message: 'This user does not exist"' });
        return;
      }
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid password!' });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          first_name: user.first_name,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          second_name: user.second_name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during login',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  static register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { first_name, second_name, email, password } = req.body;

      if (!first_name || !email || !password) {
        res.status(400).json({ message: 'Some of the arguments are missing' });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
      }

      const verifyEmail = await pool.query(`SELECT email FROM users WHERE email = $1`, [email]);
      if (verifyEmail.rows.length !== 0) {
        res.status(400).json({ message: 'This email already exist' });
        return;
      }

      if (password.length < 8) {
        res.status(400).json({ message: 'The password need be more than 8 characters' });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUserResult = await pool.query(
        `INSERT INTO users(first_name, second_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, first_name, second_name, email, role`,
        [first_name, second_name, email, hashedPassword]
      );

      res.status(201).json({
        message: 'User registered successfully',
        user: newUserResult.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during register',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  static getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const resultAllUsers = await pool.query(`
        SELECT 
        id, first_name, second_name, email, role, created_at 
        FROM users ORDER BY created_at DESC LIMIT 50
      `);

      if (resultAllUsers.rows.length === 0) {
        res.status(400).json({ message: 'No users registered' });
        return;
      }

      res.json({
        message: 'Users retrieved successfully',
        users: resultAllUsers.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching users',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  static getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        res.status(400).json({ message: 'The user id is missing' });
        return;
      }

      const resultUser = await pool.query(
        `SELECT 
        id, first_name, second_name, email, role, created_at 
        FROM users Where id = $1`,
        [userId]
      );

      if (resultUser.rows.length === 0) {
        res.status(400).json({ message: 'We do not have a user for this id' });
        return;
      }

      const user = resultUser.rows[0];

      res.json({
        message: 'User retrieved successfully',
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching user',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  static updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        res.status(400).json({ message: 'The user id is missing' });
        return;
      }

      const resultUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);

      if (resultUser.rows.length === 0) {
        res.status(400).json({ message: 'User not found' });
        return;
      }

      const { first_name, second_name, email, password, role } = req.body;

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          res.status(400).json({ message: 'Invalid email format' });
          return;
        }

        const result_email = await pool.query(`SELECT * FROM users Where email = $1`, [email]);
        if (result_email.rows.length !== 0 && result_email.rows[0].id !== userId) {
          res.status(400).json({ error: 'This email already has an account!' });
          return;
        }
      }

      if (password) {
        if (password.length < 8) {
          res.status(400).json({ message: 'Password must be at least 8 characters long' });
          return;
        }
      }

      if (role && role !== 'full_access' && role !== 'limit_access' && role !== 'user') {
        res.status(400).json({ message: 'This role does not exist' });
        return;
      }

      const fields = [];
      const values = [];
      let idx = 1;

      if (first_name) {
        fields.push(`first_name = $${idx++}`);
        values.push(first_name);
      }

      if (second_name) {
        fields.push(`second_name = $${idx++}`);
        values.push(second_name);
      }

      if (email) {
        fields.push(`email = $${idx++}`);
        values.push(email);
      }

      if (password) {
        fields.push(`password_hash = $${idx++}`);
        const hashedPassword = await bcrypt.hash(password, 10);
        values.push(hashedPassword);
      }

      if (role) {
        fields.push(`role = $${idx++}`);
        values.push(role);
      }

      if (fields.length === 0) {
        res.status(400).json({ message: 'No fields to update' });
        return;
      }

      fields.push(`update_at = CURRENT_TIMESTAMP`);
      values.push(userId);

      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
      const result1 = await pool.query(query, values);

      res.json({
        message: 'User updated successfully',
        user: result1.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during update user',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  static deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        res.status(400).json({ message: 'User id is missing' });
        return;
      }

      const resultUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);

      if (resultUser.rows.length === 0) {
        res.status(400).json({ message: 'This user does not exist"' });
        return;
      }

      const user = resultUser.rows[0];
      await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

      res.status(200).json({
        message: 'User deleted successfully',
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during delete user',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
