"use client";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import EditModel from "../models/EditModel";
import { OrderItem } from "@/src/types/order";
import { useOrderContext } from "@/src/contexts/OrderProvider";
import Image from "next/image";
import useGetOneProduct from "@/src/Hooks/useGetOneProduct";
import Empty from "../ui/Empty";
import Link from "next/link";
import UserData from "../models/UserData";

function CartProductList() {
  const { orderItems, deleteItem, lengthOfOrderItem, totalPrice } = useOrderContext();
  const [isModifyModelOpen, SetIsModifyModelOpen] = useState(false);
  const [isUserDataModelOpen, SetIsUserDataModelOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem>({
    _id: "",
    name: "",
    prices: { price: 0, discount: 0 },
    quantity: 1
  });

  const toggleModifyModel = (item: OrderItem) => {
    setSelectedOrderItem(item);
    SetIsModifyModelOpen((prev) => !prev);
  };

  const toggleUserDataModel = () => {
    SetIsUserDataModelOpen((prev) => !prev);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (lengthOfOrderItem === 0) {
    return <Empty />;
  }

  return (
    <div className="my-5 w-full">
      <div className="space-y-0">
        {orderItems?.map((orderItem, index) => (
          <CartProductItem
            key={`${orderItem._id}-${index}`}
            orderItem={orderItem}
            onEdit={toggleModifyModel}
            onDelete={deleteItem}
          />
        ))}
      </div>

      {/* Total Price Section */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300">
        {/* Total Price Display */}
        <div className="bg-gradient-to-r from-main/5 to-main/10 rounded-xl p-4 sm:p-6 mb-6 border border-main/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-col">
              <span className="text-sm sm:text-base text-gray-600 font-medium mb-1">
                Total Price:
              </span>

            </div>
            <div className="flex flex-col items-end sm:items-end">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-main font-mono tracking-tight">
                {formatPrice(totalPrice)} EGP
              </span>

            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <Link
            href="/products"
            className="w-full sm:w-auto border-2 border-main text-main cursor-pointer rounded-xl px-6 py-3 text-center font-semibold hover:bg-main hover:text-white transition-all duration-300 hover:shadow-md"
          >
            Add More to cart
          </Link>
          <button
            onClick={toggleUserDataModel}
            className="w-full sm:w-auto bg-main hover:bg-main/90 shadow-md hover:shadow-lg cursor-pointer text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Buy Now
          </button>
        </div>
      </div>

      <EditModel
        toggleModifyModel={toggleModifyModel}
        isModifyModelOpen={isModifyModelOpen}
        orderItemBeforeEdit={selectedOrderItem}
      />

      <UserData
        closeUserDataModel={toggleUserDataModel}
        isModelOpen={isUserDataModelOpen}
      />
    </div>
  );
}

interface CartProductItemProps {
  orderItem: OrderItem;
  onEdit: (item: OrderItem) => void;
  onDelete: (item: OrderItem) => void;
}

function CartProductItem({ orderItem, onEdit, onDelete }: CartProductItemProps) {
  const { data: product, isPending } = useGetOneProduct(orderItem._id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0">
        {/* Product Image */}
        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 relative">
          {isPending ? (
            <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
          ) : (
            <Image
              src={product?.imageUrl || "/logo.jpeg"}
              alt={orderItem.name}
              fill
              className="object-cover rounded"
              sizes="(max-width: 640px) 96px, 128px"
            />
          )}
        </div>

        {/* Product Information */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Product Name */}
            <h3 className="text-base sm:text-lg font-semibold text-Text mb-1">
              {orderItem.name}
            </h3>

            {/* Price */}
            <p className="text-sm sm:text-base font-bold text-Text mb-1">
              EGP {formatPrice(orderItem.prices.price)}
            </p>

            {/* Item Details */}
            <div className="text-xs sm:text-sm text-gray-600 mb-1">
              <span>{orderItem.quantity} item{orderItem.quantity > 1 ? "s" : ""}</span>


            </div>


          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 mt-2">

            <button
              onClick={() => onEdit(orderItem)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Edit item"
            >
              <Pencil size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(orderItem)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Remove item"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProductList;
