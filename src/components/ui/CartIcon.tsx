import { useOrderContext } from "@/src/contexts/OrderProvider";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

function CartIcon() {
  const {lengthOfOrderItem}=useOrderContext();
  return (
    <Link href={"/cart"} className="w-fit text-Text relative mx-4 md:mx-0">
      <p
        className={`absolute  text-base
             -top-3.5 left-1.5 z-10 
             font-bold  font-mono  w-5 h-5 p-0.5
             flex justify-center items-center
             rounded-full
             ${lengthOfOrderItem > 0 ? "text-white bg-main" : "text-Text"}

            `}
      >
        {lengthOfOrderItem}
      </p>
      <div className="z-50">
        <ShoppingBag size={35} />
      </div>
    </Link>
  );
}

export default CartIcon;
