import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/categoryService";
import { sendSuccess } from "../utils/response";
import { CategoryParamsDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";

export class CategoryController{
  static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
      const result = await CategoryService.createCategory(req.validatedData as CreateCategoryDto);
      sendSuccess(res, result, 'Category added successful');
    }catch(err){
      next(err);
    }
  }

  static async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
      const categories = await CategoryService.getAllCategories();
      sendSuccess(res, {categories}, 'Categories retrieved successfully')
    }catch(err){
      next(err);
    }
  }

  static async getByIdCategory(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{

    }catch(err){
      next(err);
    }
  }
}