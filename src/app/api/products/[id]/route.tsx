import { ProductModel } from "@/src/models /product";


export async function GET(
 request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const productModel = await ProductModel.getInstance();
    const product = await productModel.findById(id);

    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
