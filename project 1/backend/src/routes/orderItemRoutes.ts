import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth';
import { OrderItemController } from '../controllers/orderItemController';

const router = Router();

router.post('/', AuthMiddleware.authenticateToken, OrderItemController.addOrderItem);

export default router;
