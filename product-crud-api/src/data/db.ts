export interface Brand {
  id: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  brandId: string;
  quantity: number;
}

export interface User{
  id: string;
  name: string;
  password: string;
  balance: number;
  role: 'user' | 'admin'; 
}

export interface Coupon{
  id: string;
  name: string;
  discount: number;
}


export const users: User[] = [
  { id: '1', name: 'John Doe', password: 'password123', balance: 100, role: 'user' },
  { id: '2', name: 'Admin', password: 'password456', balance: 200, role: 'admin' }
];

export const brands: Brand[] = [
  { id: '1', title: 'Nike' },
  { id: '2', title: 'Adidas' }
];

export const products: Product[] = [
  { id: '101', title: 'Air Max Sneakers', price: '499.90', brandId: '1', quantity: 10 },
  { id: '102', title: 'Essentials T-Shirt', price: '99.90', brandId: '2', quantity: 20 }
];

export const coupons: Coupon[] = [
  { id: '1', name: 'Black Friday', discount: 20 },
  { id: '2', name: 'Cyber Monday', discount: 15 }
];
