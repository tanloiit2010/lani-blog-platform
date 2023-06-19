"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DeletePostModal from "./DeletePostModal";
import { useSession } from "next-auth/react";
import useQueryMyPosts from "@/app/hooks/useQueryMyPosts";
import useDeletePost from "@/app/hooks/useDeletePost";
import Loading from "@/app/components/atoms/Loading";
import PostCard from "@/app/components/PostCard";
import { toast } from "react-toastify";
import ErrorMessage from "@/app/components/atoms/ErrorMessage";
import Button from "@/app/components/atoms/Button";

const MyPosts: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | undefined>(
    undefined
  );

  const { data: posts, isLoading, isError } = useQueryMyPosts();
  const { mutate: onDeletePost, isLoading: isDeleting } = useDeletePost(
    () => {
      setConfirmDeleteId(undefined);
      toast.success("Post deleted successfully");
    },
    () => {
      toast.error("Something went wrong while deleting post");
    }
  );

  if (isLoading)
    return (
      <div className="my-24">
        <Loading />
      </div>
    );

  if (isError) return <ErrorMessage />;

  return (
    <>
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            My Posts
          </h2>
          {!posts || posts?.length === 0 ? (
            <div className="text-center">
              <div className="mt-6 text-gray-600 text-lg text-center">
                There is no posts created. Please create the first one.
              </div>
              <Button
                className="mt-4"
                onClick={() => router.push("/create-post")}
              >
                Create
              </Button>
            </div>
          ) : (
            <div className="mt-12 mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts?.map(
                (post) =>
                  post && (
                    <PostCard
                      key={post!.id}
                      {...post}
                      onUpdate={() => router.push(`/update-post/${post!.id}`)}
                      onDelete={() => setConfirmDeleteId(post!.id)}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </div>
      <DeletePostModal
        open={!!confirmDeleteId}
        isLoading={isDeleting}
        onClose={() => setConfirmDeleteId(undefined)}
        onDelete={() => {
          if (!confirmDeleteId || !session?.accessToken) return;

          onDeletePost({
            id: confirmDeleteId,
            accessToken: session?.accessToken,
          });
        }}
      />
    </>
  );
};

export default MyPosts;
