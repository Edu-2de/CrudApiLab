import { Router } from 'express';
import { BannerController } from '../controllers/bannerController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', AuthMiddleware.requireAdmin, BannerController.add);
router.post('/:bannerId', AuthMiddleware.requireAdmin, BannerController.deleteBannerById);

router.get('/:bannerId', AuthMiddleware.requireAdmin, BannerController.getBannerById);
