import axiosInstance from "@/src/lib/axios/instance";
import { Product } from "@/src/types/product";

const ProductUrl:string= "api/products";

const getFilteredOrAllProducts = async (uRLSearchParams:string|null): Promise<Product[]> => {
  const { data } = await axiosInstance.get(`${ProductUrl}?${uRLSearchParams}`);
  return data;
};

const getProductById = async (ProductId:string): Promise<Product> => {
  const { data } = await axiosInstance.get(`${ProductUrl}/${ProductId}`);
  return data;
};

export { getProductById,getFilteredOrAllProducts};
