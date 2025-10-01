import { UpdateUserDto } from '../dtos/auth.dto';
import { UserRepository } from '../repositories/userRepository';
import { HashService } from './hashService';
import { AppError } from '../utils/appError';
import { User, PublicUser } from '../entities/User';

export class UserService {
  static async getAll(): Promise<PublicUser[]> {
    const users = await UserRepository.findAll();
    if (users.length === 0) {
      throw new AppError('No users registered', 404);
    }
    return users;
  }

  static async getById(userId: number): Promise<PublicUser> {
    const user = await UserRepository.findByIdPublic(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  static async updateById(userId: number, updateDto: UpdateUserDto): Promise<PublicUser> {
    // Verificar se usuário existe
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Validar email único (se fornecido)
    if (updateDto.email && updateDto.email !== user.email) {
      const emailExists = await UserRepository.emailExists(updateDto.email, userId);
      if (emailExists) {
        throw new AppError('Email already used by another account', 400);
      }
    }

    // Preparar dados para update
    const updateData: any = { ...updateDto };
    if (updateData.password) {
      updateData.password_hash = await HashService.hash(updateData.password);
      delete updateData.password;
    }

    // Construir query dinâmica
    const { fields, values } = this.buildUpdateQuery(updateData);
    if (fields.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    // Atualizar usuário
    const updatedUser = await UserRepository.update(userId, fields, values);
    return this.sanitizeUser(updatedUser);
  }

  static async deleteById(userId: number): Promise<PublicUser> {
    // Verificar se usuário existe
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Deletar usuário
    const deletedUser = await UserRepository.delete(userId);
    return this.sanitizeUser(deletedUser);
  }

  static sanitizeUser(user: User): PublicUser {
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