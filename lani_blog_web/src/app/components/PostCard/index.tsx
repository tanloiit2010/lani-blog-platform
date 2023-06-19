import Link from "next/link";
import Button from "../atoms/Button";
import { Post } from "@/models/posts/types";

export interface PostCardProps extends Post {
  onUpdate?: () => void;
  onDelete?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  description,
  createdAt,
  categoryName,
  createdBy,
  onDelete,
  onUpdate,
}) => {
  const canEdit = onUpdate && onDelete;
  return (
    <div className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={createdAt} className="text-gray-500">
          {createdAt && new Date(createdAt).toLocaleDateString()}
        </time>
        <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          {categoryName}
        </div>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link href={`/posts/${id}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
      {!canEdit && (
        <div className="mt-4 text-sm leading-6 font-semibold text-gray-900 w-full">
          {createdBy}
        </div>
      )}
      {canEdit && (
        <div className="mt-4 flex space-x-2 w-full">
          <Button variant="white" className="!w-full flex-1" onClick={onUpdate}>
            Edit
          </Button>
          <Button variant="red" className="!w-full flex-1" onClick={onDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
