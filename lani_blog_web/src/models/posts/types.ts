export interface PostDto {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  category_id?: string;
  category_name?: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  categoryId?: string;
  categoryName?: string;
}

export interface Category {
  id: string;
  name: string;
}
