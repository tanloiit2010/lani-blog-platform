import { useQuery } from "react-query";
import axios from "../axios";
import { Post, PostDto } from "@/models/posts/types";
import { toModel } from "@/models/posts";

export const QUERY_MY_POSTS = "QUERY_MY_POSTS";

const queryPostList = async () => {
  const response = await axios.get<{
    data: PostDto[];
  }>("/api/posts");
  return response.data?.data?.map((postDto) => toModel(postDto));
};

const useQueryPostList = (initialData?: Post[]) => {
  return useQuery([QUERY_MY_POSTS], queryPostList, {
    initialData,
  });
};

export default useQueryPostList;
