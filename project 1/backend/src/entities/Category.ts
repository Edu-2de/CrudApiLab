export interface Category{
  id: number;
  name: string;
  description: string;
  created_at: Date;
}

export interface CreateCategory{
  name: string;
  description: string;
}