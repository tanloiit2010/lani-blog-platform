import { useMutation } from "react-query";
import axios from "../axios";
import { Post, PostDto } from "@/models/posts/types";
import { toModel } from "@/models/posts";

export type CreatePostParams = Pick<
  Post,
  "title" | "description" | "content" | "categoryId"
> & {
  accessToken?: string;
};

const onMutate = async (params: CreatePostParams) => {
  const { title, description, content, categoryId, accessToken } = params;

  const response = await axios.post<{
    data: PostDto;
  }>(
    `/api/account/posts`,
    {
      data: {
        title,
        description,
        content,
        category_id: categoryId,
      },
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );

  return toModel(response.data?.data);
};

const useCreatePost = (
  onSuccess?: (data: Post | null | undefined, variables: CreatePostParams, context: any) => void,
  onError?: (error: any, variables: CreatePostParams, context: any) => void
) => {
  return useMutation(onMutate, {
    onSuccess,
    onError,
  });
};

export default useCreatePost;
