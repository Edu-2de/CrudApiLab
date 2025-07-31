import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', AuthMiddleware.requireAdmin, CategoryController.addCategory);

router.delete('/:categoryId', AuthMiddleware.requireAdmin, CategoryController.deleteCategoryById);

router.get('/:categoryId', AuthMiddleware.requireAdmin, CategoryController.getCategoryById);
router.get('/', CategoryController.getAllCategories);

router.patch('/:categoryId', AuthMiddleware.requireAdmin, CategoryController.updateCategoryById);

export default router;