"use client";

import PostForm from "@/app/components/PostForm";
import ErrorMessage from "@/app/components/atoms/ErrorMessage";
import Loading from "@/app/components/atoms/Loading";
import { CreatePostParams } from "@/app/hooks/useCreatePost";
import useQueryCategories from "@/app/hooks/useQueryCategories";
import useQueryMyPostDetail from "@/app/hooks/useQueryMyPostDetail";
import useUpdatePost, { UpdatePostParams } from "@/app/hooks/useUpdatePost";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UpdatePost: React.FC = () => {
  const { postId } = useParams() || {};
  const router = useRouter();
  const { data: session } = useSession();

  const {
    data: categories,
    isLoading: isFetchingCategories,
    isError: isFetchCategoriesError,
  } = useQueryCategories();

  const {
    data: postDetail,
    isLoading: isFetchingPostDetail,
    isError: isFetchPostDetailError,
  } = useQueryMyPostDetail(postId as string);

  const { mutate: updatePost, isLoading: isSubmitting } = useUpdatePost(
    (data) => {
      data?.id && router.push(`/posts/${data?.id}`);
      toast.success("Post updated successfully");
    },
    () => {
      toast.error("Something went wrong while updating post");
    }
  );

  const onSubmit = (values: CreatePostParams) =>
    updatePost({
      ...values,
      id: postId as string,
      accessToken: session?.accessToken,
    });

  if (isFetchingCategories || isFetchingPostDetail)
    return (
      <div className="my-24">
        <Loading />
      </div>
    );

  if (isFetchCategoriesError || isFetchPostDetailError || !postDetail)
    return <ErrorMessage />;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update Post
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-7xl px-8">
        <PostForm
          isLoading={isSubmitting}
          categories={
            categories?.map((category) => ({
              label: category.name,
              value: category.id,
            })) || []
          }
          defaultValues={{
            title: postDetail?.title,
            description: postDetail?.description,
            content: postDetail?.content,
            categoryId: postDetail?.categoryId,
          }}
          onSubmit={onSubmit}
          buttonLabel="Update Post"
        />
      </div>
    </div>
  );
};

export default UpdatePost;
