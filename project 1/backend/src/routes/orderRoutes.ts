import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', AuthMiddleware.requireAdmin, OrderController.addOrder);

router.get('/', AuthMiddleware.requireAdmin, OrderController.getOrdersByUser);
router.get('/:userId', AuthMiddleware.requireAdmin, OrderController.getOrdersByUserId);

router.patch('/:orderId', AuthMiddleware.requireAdmin, OrderController.updateOrderById);

router.delete('/:orderId', AuthMiddleware.requireAdmin, OrderController.deleteOrderById);

export default router;
