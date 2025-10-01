export interface User {
  id: number;
  first_name: string;
  second_name: string;
  email: string;
  password_hash: string;
  role: 'full_access' | 'limit_access' | 'user';
  created_at: Date;
  update_at: Date;
}

export interface PublicUser {
  id: number;
  first_name: string;
  second_name: string;
  email: string;
  role: string;
  created_at: Date;
}

export interface CreateUserData {
  first_name: string;
  second_name: string;
  email: string;
  password_hash: string;
  role?: string;
}