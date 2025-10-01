import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../database/connection';
import { AppError } from '../utils/appError';
import { sendSuccess } from '../utils/response';
import { loginSchema, registerSchema } from '../validators/authValidator';
import { LoginDto, RegisterDto, UpdateUserDto, UserParamsDto } from '../dtos/auth.dto';



const JWT_SECRET = process.env.JWT_SECRET || '';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const {email, password} = req.validatedData as LoginDto;


      const { error } = loginSchema.validate(req.body);
      if (error) throw new AppError(error.details[0].message, 400);


      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0) throw new AppError('User not found', 404);

      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) throw new AppError('Invalid password', 400);

      const token = jwt.sign(
        { id: user.id, first_name: user.first_name, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      sendSuccess(
        res,
        {
          token,
          user: {
            id: user.id,
            first_name: user.first_name,
            second_name: user.second_name,
            email: user.email,
            role: user.role,
          },
        },
        'Login successful'
      );
    } catch (err) {
      next(err);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) throw new AppError(error.details[0].message, 400);

      const { first_name, second_name, email, password } = req.body;
      const verifyEmail = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
      if (verifyEmail.rows.length !== 0) throw new AppError('Email already exists', 400);

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserResult = await pool.query(
        'INSERT INTO users(first_name, second_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, first_name, second_name, email, role',
        [first_name, second_name, email, hashedPassword]
      );

      sendSuccess(res, { user: newUserResult.rows[0] }, 'User registered successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resultAllUsers = await pool.query(
        'SELECT id, first_name, second_name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 50'
      );
      if (resultAllUsers.rows.length === 0) throw new AppError('No users registered', 404);

      sendSuccess(res, { users: resultAllUsers.rows }, 'Users retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      if (!userId) throw new AppError('User id is missing', 400);

      const resultUser = await pool.query(
        'SELECT id, first_name, second_name, email, role, created_at FROM users WHERE id = $1',
        [userId]
      );
      if (resultUser.rows.length === 0) throw new AppError('User not found', 404);

      sendSuccess(res, { user: resultUser.rows[0] }, 'User retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      if (!userId) throw new AppError('User id is missing', 400);

      const resultUser = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (resultUser.rows.length === 0) throw new AppError('User not found', 404);

      const { first_name, second_name, email, password, role } = req.body;
      const fields = [];
      const values = [];
      let idx = 1;

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new AppError('Invalid email format', 400);

        const result_email = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result_email.rows.length !== 0 && result_email.rows[0].id !== userId)
          throw new AppError('Email already used by another account', 400);
      }
      if (password && password.length < 8) throw new AppError('Password must be at least 8 characters', 400);
      if (role && !['full_access', 'limit_access', 'user'].includes(role)) throw new AppError('Invalid role', 400);

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

      if (fields.length === 0) throw new AppError('No fields to update', 400);

      fields.push('update_at = CURRENT_TIMESTAMP');
      values.push(userId);

      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
      const result1 = await pool.query(query, values);

      sendSuccess(res, { user: result1.rows[0] }, 'User updated successfully');
    } catch (err) {
      next(err);
    }
  }

  static async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      if (!userId) throw new AppError('User id is missing', 400);

      const resultUser = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (resultUser.rows.length === 0) throw new AppError('User not found', 404);

      const user = resultUser.rows[0];
      await pool.query('DELETE FROM users WHERE id = $1', [userId]);

      sendSuccess(res, { user }, 'User deleted successfully', 200);
    } catch (err) {
      next(err);
    }
  }
}
