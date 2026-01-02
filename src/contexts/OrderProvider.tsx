"use client";
import { OrderItem } from "@/src/types/order";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

type OrderContextType = {
  totalPrice: number;
  userData: { userName: string; userNumber: string, userAddress: string };
  orderItems: OrderItem[];
  addNewItem: (item: OrderItem) => void;
  deleteItem: (deleteItem: OrderItem) => void;
  resetOrderItem: () => void;
  editItem: (updatedItem: OrderItem) => void;
  lengthOfOrderItem: number;
  totalQuantity: number;
  addUserData: (userName: string, userNumber: string, userAddress: string) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export default function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [userData, setUserData] = useState({ userName: "", userNumber: "", userAddress: "" });

  const calculateTotalPrice = () => {
    return orderItems.reduce((acc, current) => {
      const basePrice = current.prices.price * current.quantity;

      if (current.prices.discount > 0) {
        const discountAmount = basePrice * (current.prices.discount / 100);
        return acc + (basePrice - discountAmount);
      }

      return acc + basePrice;
    }, 0);
  };

  const addUserData = (userName: string, userNumber: string, userAddress: string) => {
    setUserData({ userName, userNumber, userAddress });
  };

  const totalPrice = +calculateTotalPrice().toFixed(2);

  const addNewItem = (newOrderItem: OrderItem) => {
    const indexofItemById = orderItems.findIndex(
      (item) => item._id === newOrderItem._id
    );

    if (indexofItemById === -1) {
      setOrderItems((prev) => [...prev, newOrderItem]);
      toast.success(`${newOrderItem.name} added to cart!`);
    } else {
      const updatedItems = [...orderItems];
      const existingItem = updatedItems[indexofItemById];
      const newQuantity = existingItem.quantity + newOrderItem.quantity;

      updatedItems[indexofItemById] = {
        ...existingItem,
        quantity: newQuantity,
      };

      setOrderItems(updatedItems);
      toast.success(`${newOrderItem.name} added to cart!`);
    }
  };

  const deleteItem = (deleteItem: OrderItem) => {
    if (orderItems.length > 0) {
      const orderItemWithOutDeletedItem = orderItems.filter(
        (item) => item._id !== deleteItem._id
      );

      setOrderItems(orderItemWithOutDeletedItem);
    }
  };

  const editItem = (editOrderItem: OrderItem) => {
    const indexOfEditedItem = orderItems.findIndex(
      (item) => item._id === editOrderItem._id
    );

    if (indexOfEditedItem !== -1) {
      const updatedItems = [...orderItems];
      updatedItems[indexOfEditedItem] = editOrderItem;
      setOrderItems(updatedItems);
      toast.success(`${editOrderItem.name} updated successfully!`);
    }
  };

  const resetOrderItem = () => {
    setOrderItems([]);
  };

  const lengthOfOrderItem = orderItems.length;
  const totalQuantity = orderItems.reduce((acc, current) => acc + current.quantity, 0);

  return (
    <OrderContext.Provider
      value={{
        resetOrderItem,
        totalPrice,
        totalQuantity,
        lengthOfOrderItem,
        addNewItem,
        deleteItem,
        editItem,
        orderItems,
        addUserData,
        userData
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === null) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }
  return context;
};