import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const route = Router();

route.post('/', AuthMiddleware.requireAdmin, OrderController.addOrder);

route.get('/', AuthMiddleware.requireAdmin, OrderController.getOrdersByUser);
route.get('/:userId', AuthMiddleware.requireAdmin, OrderController.getOrdersByUserId);