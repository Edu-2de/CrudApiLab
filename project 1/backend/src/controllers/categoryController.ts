import { Request, Response, NextFunction } from "express";
import { CategoryRepository } from "../repositories/categoryRepository";
import { sendSuccess } from "../utils/response";
import { CategoryParamsDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";

export class CategoryController{
  static async createCategory(req: Request, res: Response, next: NextFunction){
    try{

    }catch(err){
      next(err);
    }
  }
}