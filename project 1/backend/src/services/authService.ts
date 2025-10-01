import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { UserRepository } from '../repositories/userRepository';
import { HashService } from './hashService';
import { TokenService } from './tokenService';
import { UserService } from './userService';
import { AppError } from '../utils/appError';

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
      user: UserService.sanitizeUser(user),
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
}
