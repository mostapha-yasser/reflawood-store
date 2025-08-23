import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import logo from "../../../src/public/logo.png"
import { ArrowRight } from 'lucide-react';
function HeroSection() {
    return (
         
        <section className="flex flex-col lg:flex-row items-center gap-12 py-16 bg-main/10" >
      <div className="lg:w-2/3 space-y-6 px-8">
        <h1 className="text-5xl font-bold text-main">
          Welcome to Reflawood
        </h1>
        <p className="text-lg leading-relaxed text-Text text-justify" >
          Discover our premium handcrafted tables and elegant mirrors, designed with timeless 
          craftsmanship and modern style to bring warmth, character, and sophistication into 
          every corner of your home.
        </p>
        <Link href={'/products'}>
        
        <button 
          className="flex items-center cursor-pointer gap-2 px-6 py-3 font-semibold rounded-lg bg-main text-white hover:opacity-90 transition-all"
          
          >
          Shop Now
          <ArrowRight className="w-4 h-4" />
        </button>
          </Link>
      </div>
      
      <div className="lg:w-fit overflow-hidden  max-h-96 border-4 rounded-sm border-main">
      
       <Image src={logo} alt={'logo'}width={400} height={600}/>
      </div>
    </section>
    );
}

export default HeroSection;