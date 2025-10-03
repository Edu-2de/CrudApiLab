import { Request, Response, NextFunction } from 'express';
import { BannerService } from '../services/bannerService';
import { sendSuccess } from '../utils/response';
import { BannerParamsDto, BannerStatusDto, CreateBannerDto, UpdateBannerDto } from '../dtos/banner.dto';

export class BannerController {
  static async createBanner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await BannerService.createBanner(req.validatedData as CreateBannerDto);
      sendSuccess(res, result, 'Banner added successful');
    } catch (err) {
      next(err);
    }
  }

  static async getAllBanners(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const banners = await BannerService.getAllBanners();
      sendSuccess(res, { banners }, 'Banners retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getActiveBanner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activeBanners = await BannerService.getActiveBanner();
      sendSuccess(res, { activeBanners }, 'Banners retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getByIdBanner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bannerId } = req.validatedData;
      const banner = await BannerService.getByIdBanner(bannerId);
      sendSuccess(res, { banner }, 'Banner retrieved successfully');
    } catch (err) {
      next(err);
    }
  }
}
