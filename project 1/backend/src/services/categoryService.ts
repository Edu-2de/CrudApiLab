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

  static async getAllCategories(): Promise<Category[]> {
    const categories = await CategoryRepository.findAll();
    if (categories.length === 0) {
      throw new AppError('No categories found', 404);
    }
    return categories;
  }

  static async getCategoryById(categoryId: number): Promise<Category> {
    const category = await CategoryRepository.findById(categoryId);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  }

  static async updateByIdCategory(parseInt: (string: string, radix?: number) => number, categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await CategoryRepository.findById(categoryId);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const { fields, values } = this.buildUpdateQuery(updateCategoryDto);
    if (fields.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    const updateCategory = await CategoryRepository.update(categoryId, fields, values);
    return updateCategory;
  }

  static async deleteByIdCategory(categoryId: number): Promise<Category>{
    const category = await CategoryRepository.findById(categoryId);
    if(!category){
      throw new AppError('Category not found', 404);
    }

    const deleteCategory = await CategoryRepository.delete(categoryId);
    return deleteCategory
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
