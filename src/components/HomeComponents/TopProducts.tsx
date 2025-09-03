"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import useProduct from "@/src/Hooks/useProduct";
import Loading from "../ui/Loading";
import ProductCard from "../productComponent/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TopProducts() {
  const { data, isLoading, error } = useProduct();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div></div>;
  if (!data || !Array.isArray(data)) return null;

  const topProducts = data.filter((product) => product.isTopProduct);
  if (topProducts.length === 0) return null;

  // Determine slidesToShow based on window width
  const getSlidesToShow = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 250,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-main">
        Top Products
      </h2>
      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {topProducts.map((product) => (
            <div key={product._id} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TopProducts;
