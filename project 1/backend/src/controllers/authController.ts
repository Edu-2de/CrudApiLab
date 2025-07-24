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
        res.status(400).json({ error: 'Email or password is missing!' });
        return;
      }
      const result = await pool.query(`SELECT * FROM users WHERE email  = $1`, [email]);
      if (result.rows.length == 0) {
        res.status(400).json({ error: 'This user not exist' });
        return;
      }
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        res.status(400).json({ error: 'Invalid password!' });
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

      if(!first_name || !second_name || !email || !password){
        res.status(400).json({error: 'Some of the arguments are missing'});
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      const verifyEmail = await pool.query(`SELECT email FROM users WHERE email = $1`, [email]);
      if (verifyEmail.rows.length > 0) {
        res.status(400).json({ error: 'This email already exist' });
      }

      if (password.length < 8) {
        res.status(400).json({ error: 'The password need be more than 8 characters' });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUserResult = await pool.query(
        `INSERT INTO users(first_name, second_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
        [first_name, second_name, email, hashedPassword]
      );

      res.status(201).json({
        message: 'User registered successfully',
        user: newUserResult,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error during login',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}
