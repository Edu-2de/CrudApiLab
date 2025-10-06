import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/categoryService";
import { sendSuccess } from "../utils/response";
import { CategoryParamsDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";

export class CategoryController{
  static async createCategory(req: Request, res: Response, next: NextFunction){
    try{
      const result = await CategoryService.createCategory(req.validatedData as CreateCategoryDto);
      sendSuccess(res, result, 'Category added successful');
    }catch(err){
      next(err);
    }
  }
}