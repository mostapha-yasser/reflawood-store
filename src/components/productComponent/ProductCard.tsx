import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/src/types/product';
import { MoveRight, Check, ShoppingCart } from 'lucide-react';
import { useOrderContext } from '@/src/contexts/OrderProvider';
import { OrderItem } from '@/src/types/order';
import logo from '../../../public/logo.png';

function ProductCard({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Pre-validate image URL
    if (product.imageUrl) {
      const img = new window.Image();
      img.onerror = () => setImageError(true);
      img.onload = () => setImageError(false);
      img.src = product.imageUrl;
    } else {
      setImageError(true);
    }
  }, [product.imageUrl]);

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };
  const discountedPrice = calculateDiscountedPrice(product.prices.price, product.prices.discount);
  const savings = product.prices.price - discountedPrice;
  const { addNewItem } = useOrderContext();
  const handleAddToCart = () => {
    try {
      setIsLoading(true);
      const orderItem: OrderItem = {
        _id: product._id,
        name: product.name,
        prices: {
          price: product.prices.price,
          discount: product.prices.discount || 0
        },
        quantity: 1
      };
      addNewItem(orderItem);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);

    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-main/5 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <Image
          src={imageError ? logo : product.imageUrl}
          alt={product.name}
          width={400}
          height={256}
          className="w-full h-64 object-cover"
          priority={false}
          unoptimized={imageError}
        />
        {product.prices.discount > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold px-3 py-1 rounded-full text-sm">
              {product.prices.discount}% OFF
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span
            className="inline-block px-2 py-1 text-xs font-semibold rounded-full capitalize"
            style={{
              backgroundColor: 'var(--color-headerBg)',
              color: 'var(--color-main)'
            }}
          >
            {product.category}
          </span>
        </div>

        <h3 className="text-lg  font-bold mb-2
         text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        <div className="
         flex items-center
         justify-between mb-4
         ">
          <div className="flex items-center space-x-2">
            {product.prices.discount > 0 ? (
              <>
                <span
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-price)' }}
                >
                  {discountedPrice.toFixed(2)}EGP
                </span>
                <span
                  className="text-sm line-through"
                  style={{ color: 'var(--color-original-price)' }}
                >
                  {product.prices.price}EGP
                </span>
              </>
            ) : (
              <span
                className="text-xl font-bold"
                style={{ color: 'var(--color-price)' }}
              >
                {product.prices.price}EGP
              </span>
            )}
          </div>
        </div>

        <p className="text-green-600 text-sm font-semibold mb-4 min-h-4">
        {product.prices.discount > 0 && (
           <span>

            Save {savings.toFixed(2)} EGP
           </span> 
          )}
          </p>

        <p className="text-gray-600 min-h-11 text-sm mb-4 line-clamp-2 truncate">
          {product.shortDesc}
        </p>

        <div className="space-y-4">
                <Link href={`/products/${product._id}`}>
            <button className="w-full  cursor-pointer flex gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-1">
              More Details <MoveRight/>
            </button>
          </Link>

          <button
            className={`w-full px-4 py-2 rounded-lg font-semibold 
              transition-all duration-200 hover:-translate-y-1 
              disabled:opacity-50 disabled:cursor-not-allowed 
              flex items-center justify-center gap-2 ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-main text-white hover:bg-main/90'
            }`}
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Adding...
              </>
            ) : isAdded ? (
              <>
                <Check size={16} />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
