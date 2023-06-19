import { useQuery } from "react-query";
import axios from "../axios";
import { useSession } from "next-auth/react";
import { PostDto } from "@/models/posts/types";
import { toModel } from "@/models/posts";

export const QUERY_MY_POST_DETAIL = "QUERY_MY_POST_DETAIL";

const queryMyPostDetail =
  (accessToken?: string) =>
  async ({ queryKey }: { queryKey: any[] }) => {
    const [_key, { postId }] = queryKey;

    const response = await axios.get<{
      data: PostDto;
    }>(`/api/account/posts/${postId}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return toModel(response.data?.data);
  };

const useQueryMyPostDetail = (postId: string) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery(
    [QUERY_MY_POST_DETAIL, { postId }],
    queryMyPostDetail(accessToken),
    {
      enabled: !!accessToken,
    }
  );
};

export default useQueryMyPostDetail;
