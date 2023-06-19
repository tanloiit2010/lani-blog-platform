import { useQuery } from "react-query";
import axios from "../axios";
import { Category } from "@/models/posts/types";

export const QUERY_CATEGORIES = "QUERY_CATEGORIES";

const queryCategories = async () => {
  const response = await axios.get<{
    data: Category[];
  }>("/api/categories");
  return response.data?.data;
};

const useQueryCategories = () => {
  return useQuery([QUERY_CATEGORIES], queryCategories);
};

export default useQueryCategories;
