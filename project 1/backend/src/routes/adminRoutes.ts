import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', AuthMiddleware.requireAdmin, (req, res) => {
  res.json({
    message: 'Admin dashboard',
  });
});

export default router;
