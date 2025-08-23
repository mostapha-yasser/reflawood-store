import ProductDetail from '@/src/components/products/ProductDetail';
import React from 'react';

async function page({params}:{params:Promise<{productId:string}>}) {
    const productId=(await params).productId
    return (
        <ProductDetail productId={productId}/>
    );
}

export default page;