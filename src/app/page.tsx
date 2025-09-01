import { Suspense } from "react";
import ProductCategories from "../components/HomeComponents/ ProductCategories";
import HeroSection from "../components/HomeComponents/HeroSection";
import TopProducts from "../components/HomeComponents/TopProducts";
import WhyChooseUs from "../components/HomeComponents/WhyChooseUs";
import Loading from "../components/ui/Loading";


export default function Home() {
  return (
  <div className="w-4/5 mx-auto space-y-20 py-8 text-Text">
      <HeroSection />
      <Suspense fallback={<Loading/>}>
      <TopProducts/>
      </Suspense>
      <ProductCategories />
      <WhyChooseUs />
    </div>
  );
}
