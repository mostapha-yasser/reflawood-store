import ProductGallery from '@/src/components/productComponent/ProductGallery';
import Loading from '@/src/components/ui/Loading';
import React, { Suspense } from 'react';
function page() {
    return (
        <div className='min-h-screen  mx-auto my-10 max-w-11/12'>
 <Suspense fallback={<Loading/>}>
        <ProductGallery />
      </Suspense>        </div>
    );
}

export default page;