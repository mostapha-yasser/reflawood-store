import { ChangeEvent, useState, useEffect } from "react";
import { Product } from "../types/product";
import { OrderItem } from "../types/order";

const useCreateOrderItem = (Product?: Product, initialOrderItem?: OrderItem) => {
  const createItemKey = (item?: OrderItem) => {
    if (!item) return "";
    const discount = item.prices?.discount || 0;
    return `${item._id}-${discount}-${item.quantity}`;
  };

  const initializeOrderItem = (customQuantity?: number): OrderItem => {
    if (initialOrderItem) {
      return {
        _id: initialOrderItem._id || "",
        name: initialOrderItem.name || "",
        prices: {
          price: initialOrderItem.prices?.price || 0,
          discount: initialOrderItem.prices?.discount || 0
        },
        quantity: customQuantity !== undefined ? customQuantity : initialOrderItem.quantity || 1
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
        quantity: customQuantity || 1
      };
    }

    return {
      _id: "",
      name: "",
      prices: { price: 0, discount: 0 },
      quantity: customQuantity || 1
    };
  };

  const [quantity, setQuantity] = useState(() => initialOrderItem?.quantity || 1);
  const [orderItem, setOrderItem] = useState<OrderItem>(() => initializeOrderItem());
  const [currentItemKey, setCurrentItemKey] = useState(() => createItemKey(initialOrderItem));

  const resetToInitial = () => {
    if (initialOrderItem) {
      setQuantity(initialOrderItem.quantity || 1);
      const resetItem = initializeOrderItem(initialOrderItem.quantity);
      setOrderItem(resetItem);
      setCurrentItemKey(createItemKey(resetItem));
    } else if (Product) {
      setQuantity(1);
      const resetItem = initializeOrderItem(1);
      setOrderItem(resetItem);
      setCurrentItemKey(createItemKey(resetItem));
    }
  };

  useEffect(() => {
    if (initialOrderItem) {
      setQuantity(initialOrderItem.quantity || 1);
    }
  }, [initialOrderItem]);

  useEffect(() => {
    if (initialOrderItem) {
      const newOrderItem = initializeOrderItem(quantity);
      setOrderItem(newOrderItem);
      setCurrentItemKey(createItemKey(newOrderItem));
    } else if (Product) {
      const newOrderItem = initializeOrderItem(quantity);
      setOrderItem(newOrderItem);
      setCurrentItemKey(createItemKey(newOrderItem));
    }
  }, [initialOrderItem, Product, quantity]);

  useEffect(() => {
    setOrderItem(prev => {
      const updated = {
        ...prev,
        quantity: quantity
      };
      setCurrentItemKey(createItemKey(updated));
      return updated;
    });
  }, [quantity]);

  const addOneMore = () => {
    setQuantity(prev => {
      const newQuantity = prev + 1;
      return newQuantity;
    });
  };

  const minsOne = () => {
    setQuantity(prev => {
      const newQuantity = Math.max(prev - 1, 1);
      return newQuantity;
    });
  };

  const handleAddToCart = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (name === "quantity") {
      const newQuantity = Number(value) || 1;
      setQuantity(newQuantity);
    } else {
      const processedValue = type === 'number' ? Number(value) : value;
      setOrderItem(prev => ({
        ...prev,
        [name]: processedValue,
      }));
    }
  };



  return {
    quantity,
    orderItem,
    currentItemKey,
    handleAddToCart,
    addOneMore,
    minsOne,
    setOrderItem,

  };
};

export default useCreateOrderItem;