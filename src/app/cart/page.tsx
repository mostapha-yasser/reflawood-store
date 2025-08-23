import ProductTable from "@/src/components/cartComponents/ProductTable";


function Cart() {

  return (
    <div className="min-h-screen text-Text w-19/20 md:w-10/12 mx-auto">
      <h1 className="text-xl sm:text-2xl lg:text-4xl text-center py-4 font-bold ">
        YOUR Order 
      </h1>
        <ProductTable/>

       
    </div>
  );
}

export default Cart;
