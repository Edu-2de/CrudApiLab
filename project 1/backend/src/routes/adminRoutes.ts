import {Router} from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.use(AuthMiddleware.requireAdmin);
