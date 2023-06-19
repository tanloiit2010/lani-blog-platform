import { Post, PostDto } from "./types";

export const toModel = (postDto?: PostDto): Post | undefined | null => {
  if (!postDto) return undefined;

  return {
    id: postDto.id,
    title: postDto.title,
    description: postDto.description,
    content: postDto.content,
    slug: postDto.slug,
    userId: postDto.user_id,
    categoryId: postDto.category_id,
    createdAt: postDto.created_at,
    createdBy: postDto.created_by,
    updatedAt: postDto.updated_at,
    categoryName: postDto.category_name,
  };
};

export const toDto = (post: Post): PostDto => {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    content: post.content,
    slug: post.slug,
    user_id: post.userId,
    category_id: post.categoryId,
    created_at: post.createdAt,
    created_by: post.createdBy,
    updated_at: post.updatedAt,
    category_name: post.categoryName,
  };
};
