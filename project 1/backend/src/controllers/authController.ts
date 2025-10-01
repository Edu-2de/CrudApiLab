import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { sendSuccess } from '../utils/response';
import { LoginDto, RegisterDto, UpdateUserDto } from '../dtos/auth.dto';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.login(req.validatedData as LoginDto);
      sendSuccess(res, result, 'Login successful');
    } catch (err) {
      next(err);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.register(req.validatedData as RegisterDto);
      sendSuccess(res, result, 'User registered successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  static async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const user = await AuthService.getCurrentUser(userId);
      sendSuccess(res, { user }, 'Current user retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await AuthService.getAllUsers();
      sendSuccess(res, { users }, 'Users retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.validatedData;
      const user = await AuthService.getUserById(userId);
      sendSuccess(res, { user }, 'User retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await AuthService.updateUserById(parseInt(userId), req.validatedData as UpdateUserDto);
      sendSuccess(res, { user }, 'User updated successfully');
    } catch (err) {
      next(err);
    }
  }

  static async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await AuthService.deleteUserById(parseInt(userId));
      sendSuccess(res, { user }, 'User deleted successfully');
    } catch (err) {
      next(err);
    }
  }
}
