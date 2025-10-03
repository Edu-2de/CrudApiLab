import { Request, Response, NextFunction } from 'express';
import { BannerService } from '../services/bannerService';
import {sendSuccess} from '../utils/response';
import {BannerParamsDto, BannerStatusDto, CreateBannerDto, UpdateBannerDto} from '../dtos/banner.dto';


export class BannerController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
      const result = await BannerService.create(req.validatedData as CreateBannerDto);
      sendSuccess(res, result, 'Banner added successful')
    }catch(err){
      next(err);
    }
  }

  
}