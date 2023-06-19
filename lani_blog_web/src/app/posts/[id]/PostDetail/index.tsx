"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import useQueryPostDetail from "@/app/hooks/useQueryPostDetail";
import Loading from "@/app/components/atoms/Loading";
import ErrorMessage from "@/app/components/atoms/ErrorMessage";
import { Post } from "@/models/posts/types";

interface PostDetailProps extends Post {}

const PostDetail: React.FC<PostDetailProps> = (post) => {
  const {
    data: postDetail,
    isLoading,
    isError,
  } = useQueryPostDetail(post.id, post);
  const { title, content, createdBy } = postDetail || {};

  if (isLoading)
    return (
      <div className="my-24">
        <Loading />
      </div>
    );

  if (isError) return <ErrorMessage />;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl"></div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-7xl px-8">
        <div className="prose w-full min-w-full max-w-full">
          <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="font-medium text-center">{createdBy}</p>
          {content && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
