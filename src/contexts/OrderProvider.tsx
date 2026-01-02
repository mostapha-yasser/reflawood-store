"use client";
import { OrderItem } from "@/src/types/order";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

type OrderContextType = {
  totalPrice: number;
  userData: {
    userName: string;
    userNumber: string;
    city: string;
    street: string;
    buildingNumber: string;
    apartmentNumber: string;
  };
  orderItems: OrderItem[];
  addNewItem: (item: OrderItem) => void;
  deleteItem: (deleteItem: OrderItem) => void;
  resetOrderItem: () => void;
  editItem: (updatedItem: OrderItem) => void;
  lengthOfOrderItem: number;
  totalQuantity: number;
  addUserData: (
    userName: string,
    userNumber: string,
    city: string,
    street: string,
    buildingNumber: string,
    apartmentNumber: string
  ) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

const CART_STORAGE_KEY = "reflawood_cart_items";

export default function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [userData, setUserData] = useState({
    userName: "",
    userNumber: "",
    city: "",
    street: "",
    buildingNumber: "",
    apartmentNumber: ""
  });

  // Initialize cart from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem(CART_STORAGE_KEY);
    if (storedItems) {
      try {
        setOrderItems(JSON.parse(storedItems));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(orderItems));
  }, [orderItems]);

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

  const addUserData = (
    userName: string,
    userNumber: string,
    city: string,
    street: string,
    buildingNumber: string,
    apartmentNumber: string
  ) => {
    setUserData({ userName, userNumber, city, street, buildingNumber, apartmentNumber });
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