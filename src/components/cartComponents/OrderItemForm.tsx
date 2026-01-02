import { useOrderContext } from "@/src/contexts/OrderProvider";
import useCreateOrderItem from "@/src/Hooks/useCreateOrderItem";
import useGetOneProduct from "@/src/Hooks/useGetOneProduct";
import { OrderItem } from "@/src/types/order";

function OrderItemForm({
  orderItemBeforeEdit,
  toggleModifyModel
}: {
  orderItemBeforeEdit: OrderItem;
  toggleModifyModel?: (order: OrderItem) => void;
}) {
  const { data } = useGetOneProduct(orderItemBeforeEdit._id);
  const { editItem } = useOrderContext();
  const {
    handleAddToCart,
    orderItem,
    addOneMore,
    minsOne,
    quantity
  } = useCreateOrderItem(data, orderItemBeforeEdit);

  const handleEditClick = () => {
    editItem(orderItem);
    if (toggleModifyModel) {
      toggleModifyModel(orderItem);
    }
  };

  return (
    <div className="text-Text space-y-4 w-full">
      <div className="flex justify-between items-center text-nowrap">
        <p className="text-base md:text-xl font-semibold">{orderItemBeforeEdit.name}</p>
        <span className="font-mono text-green-500 text-sm md:text-base">
          {orderItemBeforeEdit.prices.price} EGP
        </span>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span>Original Price:</span>
          <span className="font-mono">{orderItemBeforeEdit.prices.price} EGP</span>
        </div>
        {orderItemBeforeEdit.prices.discount > 0 && (
          <div className="flex justify-between items-center text-sm text-green-600">
            <span>Discount:</span>
            <span className="font-mono">{orderItemBeforeEdit.prices.discount}%</span>
          </div>
        )}
        <hr className="my-2" />
        <div className="flex justify-between items-center font-semibold">
          <span>Final Price:</span>
          <span className="font-mono text-main">
            {(orderItemBeforeEdit.prices.price * (1 - orderItemBeforeEdit.prices.discount / 100)).toFixed(2)} EGP
          </span>
        </div>
      </div>

      {/* Quantity Section */}
      <div className="space-y-2">
        <label htmlFor="quantity" className="block">
          <p className="text-sm md:text-base font-medium text-gray-700">
            Quantity
          </p>
        </label>

        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button
            type="button"
            onClick={minsOne}
            className="
              w-12 h-12 bg-main text-white
              font-bold text-xl
              cursor-pointer
              hover:bg-opacity-90
              transition-all
              flex items-center justify-center
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={quantity <= 1}
          >
            −
          </button>

          <input
            id="quantity"
            name="quantity"
            min={1}
            max={50}
            value={quantity}
            onChange={handleAddToCart}
            type="number"
            className="
              flex-1 h-12
              font-mono text-center
              text-base md:text-lg
              border-0 outline-none
              bg-white
              focus:ring-2 focus:ring-main focus:ring-inset
            "
          />

          <button
            type="button"
            onClick={addOneMore}
            className="
              w-12 h-12 bg-main text-white
              font-bold text-xl
              cursor-pointer
              hover:bg-opacity-90
              transition-all
              flex items-center justify-center
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          // disabled={quantity >= 50}
          >
            +
          </button>
        </div>

        {/* <p className="text-xs text-gray-500">
          Quantity range: 1-50 pieces
        </p> */}
      </div>

      {/* Total Price Display */}
      <div className="bg-white border-2 border-main bg-opacity-10 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total for {quantity} item(s):</span>
          <span className="font-bold text-main text-lg">
            {(
              orderItemBeforeEdit.prices.price *
              quantity *
              (1 - orderItemBeforeEdit.prices.discount / 100)
            ).toFixed(2)} EGP
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleEditClick}
        className="
          w-full bg-main text-white
          py-3 px-4
          text-sm md:text-base
          font-medium
          rounded-lg
          hover:bg-opacity-90
          transition-all
          focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2
        "
      >
        Update Item
      </button>
    </div>
  );
}

export default OrderItemForm;