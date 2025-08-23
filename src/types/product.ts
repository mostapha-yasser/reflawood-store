import { ObjectId } from 'mongodb';
export interface Price {
  price: number;
  discount: number;
}
export interface Product {
  _id: string;
  name: string;
  prices: Price;
  category: "table" | "mirrors";
  shortDesc: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductDB {
  _id: ObjectId;
  name: string;
  prices: Price;
  category: "table" | "mirrors";
  shortDesc: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductInput {
  _id:string | undefined
  name: string;
  prices: Price;
  category: "table" | "mirrors";
  shortDesc: string;
  description: string;
  imageUrl: string;

}