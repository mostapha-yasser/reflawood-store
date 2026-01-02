import Link from 'next/link';
import React from 'react';

function ProductCategories() {
  return (
    <section className="py-16 px-6 bg-main-5">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-main">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          href="/products?category=table"
          className="block rounded-2xl bg-white border-2 border-main p-6 text-center font-semibold text-lg text-Text shadow-md hover:bg-main hover:text-white hover:shadow-lg transition transform hover:scale-105"
        >
          <h3 className="text-2xl font-bold mb-2">Tables</h3>
          <p className="text-sm md:text-base">
            Elegant dining and coffee tables with timeless designs to suit any home.
          </p>
        </Link>

        <Link
          href="/products?category=mirrors"
          className="block rounded-2xl bg-white border-2 border-main p-6 text-center font-semibold text-lg text-Text shadow-md hover:bg-main hover:text-white hover:shadow-lg transition transform hover:scale-105"
        >
          <h3 className="text-2xl font-bold mb-2">Mirrors</h3>
          <p className="text-sm md:text-base">
            Stylish mirrors that brighten your space and add a touch of luxury.
          </p>
        </Link>

        <Link
          href="/products?category=sofas&chairs"
          className="block rounded-2xl bg-white border-2 border-main p-6 text-center font-semibold text-lg text-Text shadow-md hover:bg-main hover:text-white hover:shadow-lg transition transform hover:scale-105 md:col-span-2"
        >
          <h3 className="text-2xl font-bold mb-2">Sofas & Chairs</h3>
          <p className="text-sm md:text-base">
            Comfortable and stylish seating options designed for modern living.
          </p>
        </Link>
      </div>
    </section>
  );
}

export default ProductCategories;
