import { CreateBannerDto, UpdateBannerDto } from '../dtos/banner.dto';
import { BannerRepository } from '../repositories/bannerRepository';
import { Banner } from '../entities/Banner';
import { AppError } from '../utils/appError';

export class BannerService {
  static async createBanner(createBannerDto: CreateBannerDto): Promise<Banner> {
    const { title, image_url, link_url } = createBannerDto;

    const bannerData = {
      title,
      image_url,
      link_url,
    };

    const banner = await BannerRepository.create(bannerData);
    return banner;
  }

  static async getAllBanners(): Promise<Banner[]> {
    const banners = await BannerRepository.findAll();
    if (banners.length === 0) {
      throw new AppError('No banners found', 404);
    }
    return banners;
  }

  static async getActiveBanner(): Promise<Banner[]> {
    const banners = await BannerRepository.findActive();
    if (banners.length === 0) {
      throw new AppError('No active banners found', 404);
    }
    return banners;
  }

  static async getByIdBanner(bannerId: number): Promise<Banner> {
    const banner = await BannerRepository.findById(bannerId);
    if (!banner) {
      throw new AppError('Banner not found', 404);
    }
    return banner;
  }

  static async updateByIdBanner(bannerId: number, updateDto: UpdateBannerDto): Promise<Banner> {
    const banner = await BannerRepository.findById(bannerId);
    if (!banner) {
      throw new AppError('Banner not found', 404);
    }

    const { fields, values } = this.buildUpdateQuery(updateDto);
    if (fields.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    const updatedBanner = await BannerRepository.update(bannerId, fields, values);
    return updatedBanner;
  }

  static async deleteByIdBanner(bannerId: number): Promise<Banner> {
    const banner = await BannerRepository.findById(bannerId);
    if (!banner) {
      throw new AppError('Banner not found', 404);
    }

    const deletedBanner = await BannerRepository.delete(bannerId);
    return deletedBanner;
  }

  static async toggleActiveBanner(bannerId: number): Promise<Banner> {
    const banner = await BannerRepository.findById(bannerId);
    if (!banner) {
      throw new AppError('Banner not found', 404);
    }

    const updatedBanner = await BannerRepository.toggleActive(bannerId);
    return updatedBanner;
  }

  static async setActiveBanner(bannerId: number, active: boolean): Promise<Banner> {
    const banner = await BannerRepository.findById(bannerId);
    if (!banner) {
      throw new AppError('Banner not found', 404);
    }

    const updatedBanner = await BannerRepository.setActive(bannerId, active);
    return updatedBanner;
  }

  private static buildUpdateQuery(updateData: any) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fields.push(`${key} = $${idx++}`);
        values.push(value);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    return { fields, values };
  }
}
