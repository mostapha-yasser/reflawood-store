"use client";
import useProduct from "@/src/Hooks/useProduct";
import ProductCard from "./ProductCard";
import Loading from "../ui/Loading";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import EmptyLogo from "../../../public/EmptyLogo.svg"
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

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading products: {error.message}</div>;
  if (!data || !Array.isArray(data)) return null;

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { label: "All Products", value: null },
            { label: "Tables", value: "table" },
            { label: "Mirrors", value: "mirrors" },
            { label: "Sofas & Chairs", value: "sofas&chairs" },
          ].map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 cursor-pointer rounded-md transition-colors ${activeCategory === cat.value
                  ? "bg-main text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Image
            src={EmptyLogo}
            alt="No products found"
            className="w-64 h-64 object-contain mb-6 opacity-80"
          />
          <p className="text-lg text-gray-600">
            No products found in{" "}
            <span className="font-semibold text-main">
              {activeCategory || "this category"}
            </span>
            .
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
