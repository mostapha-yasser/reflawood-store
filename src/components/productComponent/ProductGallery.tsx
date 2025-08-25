
"use client"
import useProduct from "@/src/Hooks/useProduct";
import ProductCard from "./ProductCard";
import Loading from "../ui/Loading";
import Empty from "../ui/Empty";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ProductGallery() {
  const { data, isLoading, error } = useProduct();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get("category")
  );

  useEffect(() => {
    setActiveCategory(searchParams.get("category"));
  }, [searchParams]);

  const handleCategoryChange = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push('?', { scroll: false });
  };

  const hasActiveFilters = searchParams.toString().length > 0;

  if (isLoading) return <Loading/>;
  if (error) return <div>Error loading products: {error.message}</div>;
  if (!data || !Array.isArray(data)) return <Empty/>;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Filter Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === null
                ? "bg-main text-white"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => handleCategoryChange("table")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === "table"
                ? "bg-main text-white"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            Tables
          </button>
          <button
            onClick={() => handleCategoryChange("mirrors")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === "mirrors"
                ? "bg-main text-white"
                : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
            }`}
          >
            Mirrors
          </button>
        </div>
        
      
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;