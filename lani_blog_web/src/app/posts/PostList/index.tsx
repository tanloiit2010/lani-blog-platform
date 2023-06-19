"use client";

import PostCard, { PostCardProps } from "@/app/components/PostCard";
import Button from "@/app/components/atoms/Button";
import ErrorMessage from "@/app/components/atoms/ErrorMessage";
import Loading from "@/app/components/atoms/Loading";
import useQueryPostList from "@/app/hooks/useQueryPostList";
import { useRouter } from "next/navigation";

interface PostListProps {
  posts: PostCardProps[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { data: postList, isLoading, isError } = useQueryPostList(posts);
  const router = useRouter();

  if (isLoading)
    return (
      <div className="my-24">
        <Loading />
      </div>
    );

  if (isError || !postList) return <ErrorMessage />;

  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0 w-full md:flex justify-between items-center">
          <div className="">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:text-right">
            <Button
              className="px-6 py-3.5 text-lg font-semibold"
              onClick={() => router.push("create-post")}
            >
              Create
            </Button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-gray-200 pt-10 mt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
          {postList.length === 0 ? (
            <>
              <div className="mt-6 text-gray-600 text-lg text-center">
                There is no posts created. Please create the first one.
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 w-full lg:grid-cols-3">
              {postList.map(
                (post) => post && <PostCard key={post.id} {...post} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;
