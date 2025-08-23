import { getProductById } from "@/src/service/apiRequest/productsApiRequest";
import { useQuery } from "@tanstack/react-query";
const useGetOneProduct = (productId:string ) => {
  const query = useQuery({
    queryKey: [productId],
    queryFn: ()=>getProductById(productId),
    
  });

  return query;
};

export default useGetOneProduct;
