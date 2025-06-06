export interface Brand {
  id: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  brandId: string;
}

export const brands: Brand[] = [
  { id: '1', title: 'Nike' },
  { id: '2', title: 'Adidas' }
];

export const products: Product[] = [
  { id: '101', title: 'Air Max Sneakers', price: '499.90', brandId: '1' },
  { id: '102', title: 'Essentials T-Shirt', price: '99.90', brandId: '2' }
];