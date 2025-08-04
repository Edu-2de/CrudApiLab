import { Router } from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { ProductController } from '../controllers/productController';

const router = Router();

router.post('/', AuthMiddleware.requireAdmin, ProductController.addProduct);
