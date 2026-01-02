import { Price } from "./product";

export interface OrderItem {
  _id: string;
  name: string;
  prices: Price;
  quantity: number;
}


export interface Order {
  _id: string;
  userData: {
    userName: string;
    userNumber: string;
    city: string;
    street: string;
    buildingNumber: string;
    apartmentNumber: string;
  };
  items: OrderItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderInput {
  items: OrderItem[];
  totalPrice: number;
}
