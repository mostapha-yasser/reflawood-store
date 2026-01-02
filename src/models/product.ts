import { Collection, Db, Filter, ObjectId, WithId } from "mongodb";
import { Product, ProductDB } from "../types/product";
import { connectToDatabase } from "@/src/lib/mongodb";

export class ProductModel {
  private collection: Collection<ProductDB>;
  private static instance: ProductModel;

  private constructor(db: Db) {
    this.collection = db.collection<ProductDB>("products");
  }

  static async getInstance(): Promise<ProductModel> {
    if (!ProductModel.instance) {
      const { db } = await connectToDatabase("reflawood");
      ProductModel.instance = new ProductModel(db);
      await ProductModel.instance.initIndexes();
    }
    return ProductModel.instance;
  }

  async initIndexes() {
    await this.collection.createIndex({
      name: "text",
      description: "text",
    });
  }
  
  async findAll(): Promise<Product[]> {
    const products = await this.collection.find().toArray();
    return products.map(this.toResponse);
  }

  async searchByQueryAndFilter(
    query: string | null,
    filter: Filter<ProductDB> = {}
  ): Promise<Product[]> {
    let searchFilter: Filter<ProductDB> = {};
    
    if (query?.trim()) {
      searchFilter.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ];
    }
    
    if (Object.keys(filter).length > 0) {
      searchFilter = query?.trim() 
        ? { $and: [searchFilter, filter] } 
        : filter;
    }

    const products = await this.collection.find(searchFilter).toArray();
    return products.map(this.toResponse);
  }

  async findById(id: string): Promise<Product | null> {
    try {
      
      const product = await this.collection.findOne({ 
        _id: new ObjectId(id) 
      });
      return product ? this.toResponse(product) : null;
    } catch (error) {
      console.error("Error finding product by ID:", error);
      return null;
    }
  }

  private toResponse(dbProduct: WithId<ProductDB>): Product {
    return {
      _id: dbProduct._id.toString(),
      isTopProduct:dbProduct.isTopProduct,
      name: dbProduct.name,
      description: dbProduct.description,
      galleryImages:dbProduct.galleryImages,
      shortDesc: dbProduct.shortDesc,
      prices: dbProduct.prices,
      category: dbProduct.category,
      imageUrl: dbProduct.imageUrl,
      createdAt: dbProduct.createdAt,
      updatedAt: dbProduct.updatedAt,
    };
  }
}
