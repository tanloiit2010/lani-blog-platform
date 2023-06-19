import { useMutation, useQueryClient } from "react-query";
import axios from "../axios";
import { QUERY_MY_POSTS } from "./useQueryMyPosts";
import { Post } from "@/models/posts/types";

interface DeleteParams {
  id: string;
  accessToken: string;
}

const onMutate = async (params: DeleteParams) => {
  const { id, accessToken } = params;

  await axios.delete(`/api/account/posts/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });

  return {
    id,
  };
};

const useDeletePost = (
  onSuccess?: (
    data: { id: string },
    variables: DeleteParams,
    context: any
  ) => void,
  onError?: (error: any, variables: DeleteParams, context: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(onMutate, {
    onSuccess: (data, variables, context) => {
      const postList = queryClient.getQueryData<Post[]>(QUERY_MY_POSTS);

      if (postList) {
        queryClient.setQueryData(
          [QUERY_MY_POSTS],
          postList.filter((item) => item?.id !== data?.id)
        );
      }
      onSuccess && onSuccess(data, variables, context);
    },
    onError,
  });
};

export default useDeletePost;
