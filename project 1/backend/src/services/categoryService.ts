import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoryRepository } from '../repositories/categoryRepository';
import { Category } from '../entities/Category';
import { AppError } from '../utils/appError';

export class CategoryService {
  static async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { title, description } = createCategoryDto;

    const categoryData = {
      name: title,
      description,
    };

    const category = await CategoryRepository.create(categoryData);
    return category;
  }

  static async getAllCategories(): Promise<Category[]>{
    const categories  = await CategoryRepository.findAll();
    if(categories.length === 0){
      throw new AppError('No categories found', 404);
    }
    return categories;
  }

  
}
