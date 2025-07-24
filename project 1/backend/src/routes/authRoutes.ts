import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.get('/:userId', AuthMiddleware.requireAdmin, AuthController.getUserById);
router.get('/all', AuthMiddleware.requireAdmin, AuthController.getAllUsers);

router.put('/:userId', AuthMiddleware.requireAdmin, AuthController.updateUserById);

router.delete('/:userId', AuthMiddleware.requireAdmin, AuthController.deleteUserById);

export default router;