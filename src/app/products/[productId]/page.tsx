import ProductDetail from '@/src/components/products/ProductDetail';
import React from 'react';

async function page({params}:{params:Promise<{productId:string}>}) {
    const productId=(await params).productId
    return (
        <div className='flex justify-center items-center min-h-screen'>

            <ProductDetail productId={productId}/>
        </div>
    );
}

export default page;