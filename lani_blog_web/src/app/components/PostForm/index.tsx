import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormMarkDownInput from "../form/FormMarkDownInput";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";
import { CreatePostParams } from "@/app/hooks/useCreatePost";
import { UpdatePostParams } from "@/app/hooks/useUpdatePost";

export interface PostFormProps {
  isLoading?: boolean;
  categories: {
    label: string;
    value: string;
  }[];
  defaultValues?: CreatePostParams;
  buttonLabel?: string;
  onSubmit: (values: CreatePostParams) => void;
}

const PostForm: React.FC<PostFormProps> = ({
  isLoading,
  categories,
  defaultValues,
  buttonLabel,
  onSubmit,
}) => {
  const router = useRouter();
  const schema = yup.object().shape({
    title: yup.string().nullable().required("Please input title"),
    description: yup.string().nullable().required("Please input description"),
    content: yup.string().nullable().required("Please input content"),
    categoryId: yup.string().nullable().required("Please select category"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostParams>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Title"
        name="title"
        containerClassName="max-w-md mx-auto"
        control={control}
        error={errors.title}
      />
      <FormInput
        containerClassName="max-w-md mx-auto"
        label="Description"
        name="description"
        control={control}
        error={errors.description}
      />
      <FormSelect
        label="Category"
        containerClassName="max-w-md mx-auto"
        control={control}
        name={`categoryId`}
        error={errors?.categoryId}
        options={categories}
      />
      <FormMarkDownInput
        label={"Content"}
        control={control}
        name="content"
        error={errors.content}
      />
      <div className="w-full flex items-center justify-center space-x-2">
        <Button className="!w-32" variant="white" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="!w-32" type="submit" loading={isLoading}>
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
