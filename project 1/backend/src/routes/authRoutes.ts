import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateDto } from '../middleware/validation';
import { LoginDto, RegisterDto, UpdateUserDto, UserParamsDto } from '../dtos/auth.dto';

const router = Router();

router.post('/login', validateDto(LoginDto, 'body'), AuthController.login);
router.post('/register', validateDto(RegisterDto, 'body'), AuthController.register);

router.get('/users', AuthController.getAllUsers);
router.get('/users/:userId', validateDto(UserParamsDto, 'params'), AuthController.getUserById);

router.put('/users/:userId', 
  validateDto(UserParamsDto, 'params'),
  validateDto(UpdateUserDto, 'body'),
  AuthController.updateUserById
);

router.delete('/users/:userId', validateDto(UserParamsDto, 'params'), AuthController.deleteUserById);

export default router;