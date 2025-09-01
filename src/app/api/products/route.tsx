import { NextResponse } from "next/server";
import { Filter } from "mongodb";
import { ProductDB } from "@/src/types/product";
import { ProductModel } from "@/src/models /product";


export async function GET(request:Request) {
  
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const filter: Filter<ProductDB> = {};
    if (category=== "mirrors"||category=== "table"||category=== "sofas&chairs") {
      filter.category = category 
    }

    const productModel = await ProductModel.getInstance();
    await productModel.initIndexes?.();

let products;
if (Object.keys(filter).length > 0) {
  products = await productModel.searchByQueryAndFilter(null, filter);
} else {
  products = await productModel.findAll();
}
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


