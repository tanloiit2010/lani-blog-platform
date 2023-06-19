import { useQuery } from "react-query";
import axios from "../axios";
import { Post, PostDto } from "@/models/posts/types";
import { toModel } from "@/models/posts";

export const QUERY_POST_DETAIL = "QUERY_POST_DETAIL";

export const queryPostDetail = async ({ queryKey }: { queryKey: any[] }) => {
  const [_key, { postId }] = queryKey;

  const response = await axios.get<{
    data: PostDto;
  }>(`/api/posts/${postId}`);
  return toModel(response.data?.data);
};

const useQueryPostDetail = (postId: string, initialData?: Post) => {
  return useQuery([QUERY_POST_DETAIL, { postId }], queryPostDetail, {
    initialData,
  });
};

export default useQueryPostDetail;
