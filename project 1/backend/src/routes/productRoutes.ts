import { Router } from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { ProductController } from '../controllers/productController';

const router = Router();

router.post('/', AuthMiddleware.requireAdmin, ProductController.addProduct);

router.delete('/:productId', AuthMiddleware.requireAdmin, ProductController.deleteProductById);

router.get('/:productId', AuthMiddleware.requireAdmin, ProductController.getProductById);
router.get('/all', AuthMiddleware.requireAdmin, ProductController.getAllProducts);
router.get('/category', AuthMiddleware.authenticateToken, ProductController.getProductsByCategory);

router.patch('/:productId', AuthMiddleware.authenticateToken, ProductController.updateProductById);

export default router;
