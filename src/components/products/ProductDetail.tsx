"use client";
import useGetOneProduct from "@/src/Hooks/useGetOneProduct";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useOrderContext } from "@/src/contexts/OrderProvider";
import { useState } from "react";
import Loading from "../ui/Loading";
import useCreateOrderItem from "@/src/Hooks/useCreateOrderItem";
import UserData from "../models/UserData";

export default function ProductDetail({ productId }: { productId: string }) {
  const [isUserDataModelOpen, SetIsUserDataModelOpen] = useState(false);
  
  const { data: product, isPending } = useGetOneProduct(productId);
  
  const { addNewItem } = useOrderContext();
  
  const {
    orderItem,
    quantity,
    addOneMore,
    minsOne,
     
  } = useCreateOrderItem(product);

  const openCheckoutModal = () => {    
    if (orderItem._id && orderItem.name && orderItem.prices.price) {
      addNewItem(orderItem);
      SetIsUserDataModelOpen(true);
    } else {
      console.error("Order item is missing required data:", orderItem);
      const completeOrderItem = {
        _id: product?._id || "",
        name: product?.name || "",
        prices: {
          price: product?.prices?.price || 0,
          discount: product?.prices?.discount || 0
        },
        quantity: quantity
      };
      addNewItem(completeOrderItem);
      SetIsUserDataModelOpen(true);
    }
  };

 const toggleUserDataModel = () => {
    SetIsUserDataModelOpen((prev) => !prev);
  };
  const handleAddToCartOnly = () => {
 
    
    if (orderItem._id && orderItem.name && orderItem.prices.price) {
      addNewItem(orderItem);
    } else {
      const completeOrderItem = {
        _id: product?._id || "",
        name: product?.name || "",
        prices: {
          price: product?.prices?.price || 0,
          discount: product?.prices?.discount || 0
        },
        quantity: quantity
      };
      addNewItem(completeOrderItem);
    }
  };

  if (isPending) {
    return <Loading />;
  }

  if (!product) {
    return <div>Product not found: {productId}</div>;
  }

  

  return (
    <div className="w-15/16 mx-auto py-10 sm:py-15 text-Text flex justify-center">
      <div className="w-full flex flex-col sm:flex-row justify-between border-2 border-Aside-Border rounded-2xl">
        
        <Image
          priority
          src={product.imageUrl || logo}
          alt={product.name}
          width={400}
          height={400}
          className="w-full sm:w-6/13 rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl"
        />

        <div className="mx-auto w-10/12 sm:w-5/13 flex flex-col space-y-5 xl:space-y-9 py-5 xl:py-7">
          
          <div className="w-full flex justify-between items-center">
            <h1 className="sm:text-lg md:text-2xl xl:text-4xl font-bold">
              {product.name}
            </h1>
            <div className="text-sm sm:text-sm md:text-base lg:text-xl font-mono text-green-400 font-black">
              ${product.prices.price}
            </div>
          </div>

          <p className="text-justify text-sm md:text-base md-text-lg">
            {product.description}
          </p>

          {product.prices.discount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 line-through">
                ${product.prices.price}
              </span>
              <span className="text-lg font-bold text-red-500">
                {product.prices.discount}% OFF
              </span>
              <span className="text-lg font-bold text-green-500">
                ${(product.prices.price * (1 - product.prices.discount / 100)).toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <span className="text-sm md:text-base">Quantity:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={minsOne}
                className="w-8 h-8 border border-main rounded-full flex items-center justify-center hover:bg-main hover:text-white transition-all"
              >
                -
              </button>
              <span className="px-4 py-1 border rounded text-center min-w-12">
                {quantity}
              </span>
              <button
                onClick={addOneMore}
                className="w-8 h-8 border border-main rounded-full flex items-center justify-center hover:bg-main hover:text-white transition-all"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold text-main">
              ${(() => {
                const basePrice = product.prices.price * quantity;
                if (product.prices.discount > 0) {
                  return (basePrice * (1 - product.prices.discount / 100)).toFixed(2);
                }
                return basePrice.toFixed(2);
              })()}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleAddToCartOnly}
              className="w-3/7 text-sm p-2 md:text-base md:px-4 md:py-2 border-2 border-main rounded-2xl cursor-pointer hover:tracking-wider transition-all duration-300"
            >
              Add to cart
            </button>
            <button
              onClick={openCheckoutModal}
              className="w-3/7 text-sm p-2 md:text-base md:px-4 md:py-2 bg-main text-white rounded-2xl cursor-pointer hover:tracking-wider transition-all duration-300"
            >
              Buy now
            </button>
          </div>

              <UserData closeUserDataModel={toggleUserDataModel} isModelOpen={isUserDataModelOpen}/>

         
        </div>
      </div>
    </div>
  );
}