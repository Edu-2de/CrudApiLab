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
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Email or password is missing!' });
    });
    it('should be return 400 if the user not exist', async () => {
      mockReq.body = { email: 'test@gmail.com', password: 'password' };

      mockPool.query.mockResolvedValueOnce({ rows: [] });

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'This user not exist' });
    });
    it('should be return 400 if the password is invalid', async () => {
      mockReq.body = { email: 'test@gmail.com', password: 'wrongPassword' };

      mockPool.query.mockResolvedValueOnce({ rows: [0] });

      mockBcrypt.compare.mockResolvedValueOnce(false);

      await AuthController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid password!' });
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
        user: mockUser,
      });
    });
  });
  describe('register', () => {
    it('should be return 400 if any of the arguments are missing', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@gmail.com' };

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Some of the arguments are missing' });
    });
    it('should be return 400 if the email is not in the correct format', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@!#@$%gmail.com', password: 'password' };

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid email format' });
    });
    it('should be return 400 if the email already exist', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@gmail.com', password: 'password' };

      mockPool.query.mockResolvedValueOnce({ rows: [0] });

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'This email already exist' });
    });
    it('should be return 400 if the password is less than eighth characters', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@gmail.com', password: 'passwor' };

      mockPool.query.mockResolvedValueOnce({ rows: [] });

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'The password need be more than 8 characters' });
    });
    it('should create user successfully', async () => {
      mockReq.body = { first_name: 'first', second_name: 'second', email: 'test@gmail.com', password: 'password' };
      const mockUser = {
        id: 1,
        first_name: 'first',
        second_name: 'second',
        email: 'test@gmail.com',
        role: 'user',
      };
      mockPool.query.mockResolvedValueOnce({ rows: [] });
      mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });

      await AuthController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: mockUser,
      });
    });
  });
  describe('getAllUsers', () => {
    it('should be return 400 if no one user registered', async () => {
      mockPool.query.mockResolvedValueOnce({ rows: [] });

      await AuthController.getAllUsers(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'No one user registered' });
    });
    it('should be return the users data successful', async () => {
      const mockUsers = [
        {
          id: 1,
          first_name: 'first',
          second_name: 'second',
          email: 'test@gmail.com',
          role: 'user',
        },
        {
          id: 2,
          first_name: 'first2',
          second_name: 'second2',
          email: 'test2@gmail.com',
          role: 'user',
        },
      ];
      mockPool.query.mockResolvedValueOnce({ rows: mockUsers });

      await AuthController.getAllUsers(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Users retrieved successfully',
        users: mockUsers,
      });
    });
  });
  describe('getUserById', () => {
    it('should be return 400 if userId is missing', async () => {
      mockReq.params = {};

      await AuthController.getUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'The user id is missing' });
    });
    it('should be return 400 if user not found', async () => {
      mockReq.params = { userId: 1 };

      mockPool.query.mockResolvedValueOnce({ rows: [] });

      await AuthController.getUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'We do not have a user for this id' });
    });
    it('should return user data', async () => {
      mockReq.params = { userId: 1 };
      const mockUser = {
        id: 1,
        first_name: 'first',
        second_name: 'second',
        email: 'test@gmail.com',
        role: 'user',
      };

      mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });

      await AuthController.getUserById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User retrieved successfully',
        user: mockUser,
      });
    });
  });
  describe('updateUserById', () => {
    it('should be return 400 if the user id is missing', async () => {
      mockReq.params = {};

      await AuthController.updateUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'The user id is missing' });
    });
    it('should be return 400 if user is not found', async () => {
      mockReq.params = { userId: 1 };

      mockPool.query.mockResolvedValueOnce({ rows: [] });

      await AuthController.updateUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
    it('should be return 400 if no fields to update', async () => {
      mockReq.params = { userId: 1 };

      mockPool.query.mockResolvedValueOnce({ rows: [0] });

      mockReq.body = {};

      await AuthController.updateUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'No fields to update' });
    });
    it('should be return a successful response', async () => {
      mockReq.params = { userId: 1 };
      const mockUser = {
        id: 1,
        first_name: 'first',
        second_name: 'second',
        email: 'test@gmail.com',
        role: 'user',
      };
      const mockUpdateUser = {
        id: 1,
        first_name: 'first',
        second_name: 'second',
        email: 'newtest@gmail.com',
        role: 'user',
      };

      mockPool.query.mockResolvedValueOnce({ rows: [mockUser] });

      mockReq.body = { email: 'newtest@gmail.com' };

      mockPool.query.mockResolvedValueOnce({ rows: [] });
      mockPool.query.mockResolvedValueOnce({ rows: [mockUpdateUser] });

      await AuthController.updateUserById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User updated successfully',
        user: mockUpdateUser,
      });
    });
  });
  describe('deleteUserById', () => {
    it('should be return 400 if user id is missing', async () => {
      mockReq.params = {};

      await AuthController.deleteUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User id is missing' });
    });
    it('should be return 400 if user not exist', async () => {
      mockReq.params = { userId: 1 };

      mockPool.query.mockResolvedValueOnce({rows:[]})

      await AuthController.deleteUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'This user not exist' });
    });
    it('should be return successful response ', async () => {
      mockReq.params = { userId: 1 };
      const mockUser = {
        id: 1,
        first_name: 'first',
        second_name: 'second',
        email: 'test@gmail.com',
        role: 'user',
      };

      mockPool.query.mockResolvedValueOnce({rows:[mockUser]})

      await AuthController.deleteUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: 'User deleted successfully',
        user: mockUser
       });
    });
  });
});
