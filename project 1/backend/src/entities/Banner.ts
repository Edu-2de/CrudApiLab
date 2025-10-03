export interface Banner {
  id: number;
  title: string;
  image_url: string;
  link_url?: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBannerData {
  title: string;
  image_url: string;
  link_url?: string;
}