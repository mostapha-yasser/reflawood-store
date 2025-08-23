import { getFilteredOrAllProducts } from "@/src/service/apiRequest/productsApiRequest";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
const useProduct = ( ) => {
  const searchParams=useSearchParams()
  const urlSearchPram =new URLSearchParams(searchParams.toString()).toString()
  const query = useQuery({
    queryKey: ["Products",urlSearchPram],
    queryFn: ()=>getFilteredOrAllProducts(urlSearchPram),
    
  });

  return query;
};

export default useProduct;
