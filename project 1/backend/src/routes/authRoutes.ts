import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateDto } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { requireAdmin, requireOwnerOrAdmin, requireAnyRole } from '../middleware/authorization';
import { combineMiddleware } from '../middleware/combineMiddleware';
import { LoginDto, RegisterDto, UpdateUserDto, UserParamsDto } from '../dtos/auth.dto';

const router = Router();

router.post('/login', validateDto(LoginDto, 'body'), AuthController.login);
router.post('/register', validateDto(RegisterDto, 'body'), AuthController.register);

router.get('/users', combineMiddleware(authenticateToken, requireAdmin), AuthController.getAllUsers);

router.get(
  '/users/:userId',
  combineMiddleware(validateDto(UserParamsDto, 'params'), authenticateToken, requireOwnerOrAdmin),
  AuthController.getUserById
);

router.put(
  '/users/:userId',
  combineMiddleware(
    validateDto(UserParamsDto, 'params'),
    validateDto(UpdateUserDto, 'body'),
    authenticateToken,
    requireOwnerOrAdmin
  ),
  AuthController.updateUserById
);

router.delete(
  '/users/:userId',
  combineMiddleware(validateDto(UserParamsDto, 'params'), authenticateToken, requireAdmin),
  AuthController.deleteUserById
);

router.get('/me', authenticateToken, AuthController.getCurrentUser);

export default router;
