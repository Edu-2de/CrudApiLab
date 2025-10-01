import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { UserRepository } from '../repositories/userRepository';
import { HashService } from './hashService';
import { TokenService } from './tokenService';
import { AppError } from '../utils/appError';
import { User, PublicUser } from '../entities/User';

export class AuthService {
  static async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isValid = await HashService.compare(password, user.password_hash);
    if (!isValid) {
      throw new AppError('Invalid password', 400);
    }

    const token = TokenService.generate({
      id: user.id,
      first_name: user.first_name,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: this.sanitizeUser(user),
    };
  }

  static async register(registerDto: RegisterDto) {
    const { first_name, second_name, email, password, role } = registerDto;

    const emailExists = await UserRepository.emailExists(email);
    if (emailExists) {
      throw new AppError('Email already exists', 400);
    }

    const hashedPassword = await HashService.hash(password);

    const userData = {
      first_name,
      second_name,
      email,
      password_hash: hashedPassword,
      role: role || 'user',
    };

    const user = await UserRepository.create(userData);
    return { user };
  }

  static async getCurrentUser(userId: number): Promise<PublicUser> {
    const user = await UserRepository.findByIdPublic(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  static async getAllUsers(): Promise<PublicUser[]> {
    const users = await UserRepository.findAll();
    if (users.length === 0) {
      throw new AppError('No users registered', 404);
    }
    return users;
  }

  static async getUserById(userId: number): Promise<PublicUser> {
    const user = await UserRepository.findByIdPublic(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  static async updateUserById(userId: number, updateDto: any): Promise<PublicUser> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (updateDto.email && updateDto.email !== user.email) {
      const emailExists = await UserRepository.emailExists(updateDto.email, userId);
      if (emailExists) {
        throw new AppError('Email already used by another account', 400);
      }
    }

    const updateData: any = { ...updateDto };
    if (updateData.password) {
      updateData.password_hash = await HashService.hash(updateData.password);
      delete updateData.password;
    }

    const { fields, values } = this.buildUpdateQuery(updateData);
    if (fields.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    const updatedUser = await UserRepository.update(userId, fields, values);
    return this.sanitizeUser(updatedUser);
  }

  static async deleteUserById(userId: number): Promise<PublicUser> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const deletedUser = await UserRepository.delete(userId);
    return this.sanitizeUser(deletedUser);
  }

  private static sanitizeUser(user: User): PublicUser {
    const { password_hash, ...sanitized } = user;
    return sanitized as PublicUser;
  }

  private static buildUpdateQuery(updateData: any) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fields.push(`${key} = $${idx++}`);
        values.push(value);
      }
    });

    fields.push('update_at = CURRENT_TIMESTAMP');
    return { fields, values };
  }
}
