import { NextResponse } from "next/server";
import { Filter } from "mongodb";
import { ProductDB } from "@/src/types/product";
import { ProductModel } from "@/src/models /product";


export async function GET(request:Request) {
  
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");
    const filter: Filter<ProductDB> = {};
    if (category=== "mirrors"||category=== "table") {
      filter.category = category 
    }

    const productModel = await ProductModel.getInstance();
    await productModel.initIndexes?.();

    const products = 
      Object.keys(filter).length || query
        ? await productModel.searchByQueryAndFilter(query, filter)
        :await productModel.findAll() ;
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


