import Link from 'next/link';
import React from 'react';
import mirror from "../../../public/mirror-category.jpeg"
import table from "../../../public/table-category.jpeg"

import Image from 'next/image';
function  ProductCategories() {
    return (
         <section className="py-12 px-4 bg-main-5">
        <h2 className="  text-center text-3xl font-bold mb-4 text-main ">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto">
          <Link href="/products?category=table" className="group">
            <div className="rounded-xl overflow-hidden shadow-sm shadow-main hover:scale-105 transition">
              <Image
                src={table}
                alt="Tables"
                width={400}
                height={400}
                className="w-96 h-96 scale-90"
              />
              <div className="p-4 text-center bg-white">
                <h3 className="text-xl font-bold text-Text">Tables</h3>
                <p className='text-justify text-Text'>Exquisite dining and coffee tables crafted from premium wood, featuring unique grain patterns and superior finish.</p>
              </div>
            </div>
          </Link>

          <Link href="/products?category=mirror" className="group">
            <div className="rounded-xl overflow-hidden shadow-sm shadow-main hover:scale-105 transition">
              <Image
                src={mirror}
                alt="Mirrors"
                width={400}
                height={600}
                className="w-96 h-96  scale-90"
              />
              <div className="p-4 text-center bg-white">
                <h3 className="text-xl font-bold text-Text">Mirrors</h3>
                                <p className='text-justify text-Text'>Stunning decorative mirrors with intricate frames, designed to add depth, light, and elegance to your spaces.</p>

              </div>
            </div>
          </Link>
        </div>
      </section>
    );
}

export default  ProductCategories;