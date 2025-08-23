import ModelContainer from "./ModelContainer";
import { SquareX } from "lucide-react";
import { OrderItem } from "@/src/types/order";
import OrderItemForm from "../cartComponents/OrderItemForm";

export default function EditModel({
  isModifyModelOpen,
  orderItemBeforeEdit,
  toggleModifyModel
}: {
  isModifyModelOpen: boolean;
  orderItemBeforeEdit: OrderItem;
  toggleModifyModel: (order: OrderItem) => void;
}) {
  return (
    <ModelContainer isModelOpen={isModifyModelOpen}>
      <div className="
        relative flex justify-center
        w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3
        bg-white
        rounded-2xl py-6 px-4 md:py-8 md:px-6
        max-h-[90vh] overflow-y-auto
        shadow-xl
      ">
        {/* Close Button */}
        <button
          onClick={() => toggleModifyModel(orderItemBeforeEdit)}
          className="
            absolute top-3 right-3 
            text-red-500 hover:text-red-700
            cursor-pointer
            transition-colors
            p-1 rounded-full
            hover:bg-red-50
          "
          aria-label="Close modal"
        >
          <SquareX size={24} />
        </button>

        <div className="w-full">
          <h2 className="text-lg md:text-xl font-semibold text-center mb-6 text-gray-800 pr-8">
            Edit Item
          </h2>
          
          {/* Form Component */}
          <OrderItemForm 
            orderItemBeforeEdit={orderItemBeforeEdit}
            toggleModifyModel={toggleModifyModel}
          />
        </div>
      </div>
    </ModelContainer>
  );
}