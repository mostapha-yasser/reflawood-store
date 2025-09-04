import ProductCategories from "../components/HomeComponents/ ProductCategories";
import HeroSection from "../components/HomeComponents/HeroSection";
export default function Home() {
  return (
  <div className="w-full md:w-11/12 lg:w-4/5 lg:mx-auto space-y-20  text-Text ">
      <HeroSection />
      <ProductCategories />
    </div>
  );
}
