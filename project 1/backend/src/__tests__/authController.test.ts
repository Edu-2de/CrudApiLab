import { AuthController } from '../controllers/authController';
import pool from '../database/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../database/connection');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockPool = pool as any;
const mockBcrypt = bcrypt as any;
const mockJwt = jwt as any;

describe('AuthController', () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockReq = {
      body: {},
      user: undefined,
    };

    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should be return 400 if email or password is missing', async () => {
      mockReq.body = { email: 'test@gmail.com' };

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Email or password is missing!' });
    });
    it('should be return 400 if the user not exist', async () => {
      mockReq.body = { email: 'test@gmail.com', password: 'password' };

      mockPool.query.mockResolvedValueOnce({ rows: [] });

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'This user not exist' });
    });
    it('should be return 400 if the password is invalid', async () => {
      mockReq.body = { email: 'test@gmail.com', password: 'wrongPassword' };

      mockPool.query.mockResolvedValueOnce({ rows: [0] });

      mockBcrypt.compare.mockResolvedValueOnce(false);

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid password!' });
    });
    it('should return success response with token on valid login', async () => {
      mockReq.body = { email: 'test@gmail.com', password: 'password' };
      const mockUser = {
        id: 1,
        first_name: 'first',
        second_name: 'second',
        email: 'test@gmail.com',
        role: 'user',
      };

      mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });

      mockBcrypt.compare.mockResolvedValueOnce(true);

      mockJwt.sign.mockReturnValue('mockedToken');

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Login successful',
        token: 'mockedToken',
        user: {
          id: 1,
          first_name: 'first',
          second_name: 'second',
          email: 'test@gmail.com',
          role: 'user',
        },
      });
    });
  });
  describe('register', () => {
    it('should be return 400 if any of the arguments are missing', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@gmail.com' };

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Some of the arguments are missing' });
    });
    it('should be return 400 if the email is not in the correct format', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@!#@$%gmail.com', password:'password'};

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
    });
    it('should be return 400 if the email already exist', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@gmail.com', password:'password'};

      mockPool.query.mockResolvedValueOnce({rows: [0]})

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'This email already exist' });
    });
    it('should be return 400 if the password is less than eighth characters', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@gmail.com', password:'passwor'};

      mockPool.query.mockResolvedValueOnce({rows: []})

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'The password need be more than 8 characters' });
    });
  });
});
