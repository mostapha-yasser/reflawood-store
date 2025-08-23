import { ChangeEvent, useState, useEffect } from "react";
import { Product } from "../types/product";
import { OrderItem } from "../types/order";

const useCreateOrderItem = (Product?: Product, initialOrderItem?: OrderItem) => {
  const createItemKey = (item?: OrderItem) => {
    if (!item) return "";
    // Add safe access to prices and discount properties
    const discount = item.prices?.discount || 0;
    return `${item._id}-${discount}-${item.quantity}`;
  };

  const initializeOrderItem = (): OrderItem => {
    if (initialOrderItem) {
      // Ensure the initialOrderItem has proper prices structure
      return {
        _id: initialOrderItem._id || "",
        name: initialOrderItem.name || "",
        prices: {
          price: initialOrderItem.prices?.price || 0,
          discount: initialOrderItem.prices?.discount || 0
        },
        quantity: initialOrderItem.quantity || 1
      };
    }
    
    if (Product) {
      return {
        _id: Product._id,
        name: Product.name,
        prices: {
          price: Product.prices.price,
          discount: Product.prices.discount || 0
        },
        quantity: 1
      };
    }
    
    // Fallback - should not happen in normal usage
    return {
      _id: "",
      name: "",
      prices: { price: 0, discount: 0 },
      quantity: 1
    };
  };

  const [orderItem, setOrderItem] = useState<OrderItem>(initializeOrderItem);
  const [currentItemKey, setCurrentItemKey] = useState(createItemKey(initialOrderItem));
  const [quantity, setQuantity] = useState(initialOrderItem?.quantity || 1);

  // Re-initialize when Product changes
  useEffect(() => {
    if (Product && !initialOrderItem) {
      const newOrderItem: OrderItem = {
        _id: Product._id,
        name: Product.name,
        prices: {
          price: Product.prices.price,
          discount: Product.prices.discount || 0
        },
        quantity: quantity
      };
      setOrderItem(newOrderItem);
    }
  }, [Product, quantity, initialOrderItem]);

  // Update orderItem when quantity changes
  useEffect(() => {
    setOrderItem(prev => ({
      ...prev,
      quantity: quantity
    }));
  }, [quantity]);

  // Update currentItemKey when orderItem changes
  useEffect(() => {
    setCurrentItemKey(createItemKey(orderItem));
  }, [orderItem]);

  // Increment quantity with upper limit
  const addOneMore = () => {
    setQuantity(prev => Math.min(prev + 1, 50));
  };
  
  // Decrement quantity with lower limit
  const minsOne = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  // Handle other form inputs
  const handleAddToCart = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (name === "quantity") {
      const newQuantity = Math.max(1, Math.min(50, Number(value)));
      setQuantity(newQuantity);
    } else {
      const processedValue = type === 'number' ? Number(value) : value;
      setOrderItem(prev => ({
        ...prev,
        [name]: processedValue,
      }));
    }
  };

  // Debug function to log orderItem state
  const debugOrderItem = () => {
    console.log("Current orderItem:", orderItem);
    console.log("Product data:", Product);
    console.log("Quantity:", quantity);
  };
  
  return {
    quantity,
    orderItem,
    currentItemKey,
    handleAddToCart,
    addOneMore,
    minsOne,
    setOrderItem,
    debugOrderItem
  };
};

export default useCreateOrderItem;