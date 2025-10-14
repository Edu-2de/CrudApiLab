export interface Address{
  id: number,
  user_id: number, 
  address_line1: string,
  address_line2: string,
  city: string,
  state: string,
  postal_code: number,
  country: string,
  created_at: Date,
}


export interface CreateAddress {
  id: number,
  user_id: number, 
  address_line1: string,
  address_line2?: string,
  city: string,
  state: string,
  postal_code: number,
  country: string,
}