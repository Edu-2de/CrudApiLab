import { Router } from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.use(AuthMiddleware.requireAdmin);

router.get('/', (req, res) => {
  res.json({
    message: 'Admin dashboard',
  });
});
