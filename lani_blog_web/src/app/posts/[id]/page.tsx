import PostDetail from "./PostDetail";
import { Post } from "@/models/posts/types";

interface PostDetailProps {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const res = await fetch(`${process.env.API_URL}/api/posts/${id}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

const PostDetailPage: React.FC<PostDetailProps> = async ({ params }) => {
  const { id } = params || {};
  const response: any = await getData(id);

  return <PostDetail {...response.data} />;
};

export default PostDetailPage;
