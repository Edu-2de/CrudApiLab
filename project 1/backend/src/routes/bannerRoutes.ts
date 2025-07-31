import { Router } from 'express';
import { BannerController } from '../controllers/bannerController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', AuthMiddleware.requireAdmin, BannerController.addBanner);
router.delete('/:bannerId', AuthMiddleware.requireAdmin, BannerController.deleteBannerById);

router.get('/:bannerId', AuthMiddleware.requireAdmin, BannerController.getBannerById);
router.get('/active', AuthMiddleware.requireAdmin, BannerController.getActiveBanners);
router.get('/', AuthMiddleware.requireAdmin, BannerController.getAllBanners);

router.patch('/active/:bannerId', AuthMiddleware.requireAdmin, BannerController.activeBannerById);
router.patch('/disable/:bannerId', AuthMiddleware.requireAdmin, BannerController.disableBannerById);

export default router;
