import Link from "next/link";
import React, { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Loading from "../ui/Loading";
import TopProducts from "./TopProducts";
function HeroSection() {
  return (
    <section className=" py-16 bg-main/15">
      <div className="space-y-6 px-2 md:px-4 lg:px-8">
        <h1 className="text-5xl font-bold text-main">Reflawood</h1>
        <Suspense fallback={<Loading />}>
          <TopProducts />
        </Suspense>
        <Link href={"/products"}>
          <div className="flex justify-center md:justify-end mt-10 md:px-6">
            <button className="flex items-center gap-2 px-6 py-3 font-semibold rounded-lg bg-main text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg">
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
