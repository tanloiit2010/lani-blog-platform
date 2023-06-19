"use client";

import PostForm from "@/app/components/PostForm";
import ErrorMessage from "@/app/components/atoms/ErrorMessage";
import Loading from "@/app/components/atoms/Loading";
import useCreatePost, { CreatePostParams } from "@/app/hooks/useCreatePost";
import useQueryCategories from "@/app/hooks/useQueryCategories";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreatePost: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    data: categories,
    isLoading: isFetchingCategories,
    isError: isFetchCategoriesError,
  } = useQueryCategories();
  const { mutate: createPost, isLoading: isSubmitting } = useCreatePost(
    (data) => {
      toast.success("Post created successfully");
      data?.id &&router.push(`/posts/${data?.id}`);
    },
    () => {
      toast.error("Something went wrong while creating post");
    }
  );

  const onSubmit = (values: CreatePostParams) =>
    createPost({
      ...values,
      accessToken: session?.accessToken,
    });

  if (isFetchingCategories)
    return (
      <div className="my-24">
        <Loading />
      </div>
    );

  if (isFetchCategoriesError) return <ErrorMessage />;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Post
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-7xl px-8">
        <PostForm
          isLoading={isSubmitting}
          categories={categories?.map((category) => ({
            label: category.name,
            value: category.id,
          })) || []}
          onSubmit={onSubmit}
          buttonLabel="Create Post"
        />
      </div>
    </div>
  );
};

export default CreatePost;
