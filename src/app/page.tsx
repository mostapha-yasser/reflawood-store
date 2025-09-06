import ProductCategories from "../components/HomeComponents/ ProductCategories";
import HeroSection from "../components/HomeComponents/HeroSection";
export default function Home() {
  return (
  <div className="w-full  lg:w-11/12 lg:mx-auto space-y-20  text-Text ">
      <HeroSection />
      <ProductCategories />
    </div>
  );
}
