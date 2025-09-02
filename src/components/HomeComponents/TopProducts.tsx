"use client";
import Slider from "react-slick";
import useProduct from "@/src/Hooks/useProduct";
import Loading from "../ui/Loading";
import ProductCard from "../productComponent/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TopProducts() {
  const { data, isLoading, error } = useProduct();

  if (isLoading) return <Loading />;
  if (error) return <div ></div>;
  if (!data || !Array.isArray(data)) return null;

  const topProducts = data.filter((product) => product.isTopProduct);
  if (topProducts.length === 0) return null;

  const settings = {
    dots: true,
     arrows: true,
    infinite: true,
    speed: 250,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-main">
        Top Products
      </h2>

      <Slider {...settings}>
        {topProducts.map((product) => (
          <div key={product._id} className="px-2">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default TopProducts;
