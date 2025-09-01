import { ObjectId } from 'mongodb';

export interface Price {
  price: number;
  discount: number;
}

export interface Product {
  _id: string;
  name: string;
  prices: Price;
  category: "table" | "mirrors" |"sofas&chairs";
  shortDesc: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  isTopProduct: boolean;  
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDB {
  _id: ObjectId;
  name: string;
  prices: Price;
  category: "table" | "mirrors" |"sofas&chairs";
  shortDesc: string;
  description: string;
  galleryImages: string[];
  imageUrl: string;
  isTopProduct: boolean;  
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  _id: string | undefined;
  name: string;
  prices: Price;
  category: "table" | "mirrors" |"sofas&chairs";
  shortDesc: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  isTopProduct: boolean;  
}
