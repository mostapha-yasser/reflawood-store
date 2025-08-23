"use client"
import useProduct from "@/src/Hooks/useProduct";
import ProductCard from "./ProductCard";
import Loading from "../ui/Loading";

function ProductGallery() {
  const { data,isLoading, error } = useProduct();
  
  if (isLoading) return <Loading/>;
  if (error) return <div>Error loading products: {error.message}</div>;
  if (!data || !Array.isArray(data)) return <div>No products found</div>;
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}

export default ProductGallery;