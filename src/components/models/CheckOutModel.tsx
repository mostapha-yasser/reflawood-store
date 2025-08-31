import React, { useState } from "react";
import ModelContainer from "./ModelContainer";
import { useOrderContext } from "@/src/contexts/OrderProvider";
import emailjs from '@emailjs/browser';

function CheckOutModel({
  closeCheckOutModel,
  isModelOpen,
}: {
  closeCheckOutModel: () => void;
  isModelOpen: boolean;
}) {
  const { totalPrice, totalQuantity, orderItems, userData, resetOrderItem } = useOrderContext();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const sendOrder = async () => {
    setIsLoading(true);
    
    try {
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('EmailJS configuration is missing');
      }
      
      const emailData = {
        customer_name: userData.userName,
        customer_phone: userData.userNumber,
        customer_address:userData.userAddress,
        order_date: new Date().toLocaleDateString('en-US'),
        order_items: orderItems.map(item => 
          `${item.name} ----- Quantity: ${item.quantity} -- Price: ${item.prices.price}${item.prices.discount > 0 ? ` (${item.prices.discount}% off)` : ''}`
        ).join('\n'),
        total_quantity: totalQuantity,
        total_price: `${totalPrice} EGP`
      };

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID, 
        emailData,
        PUBLIC_KEY
      );
      

      setEmailSent(true);
      
      setTimeout(() => {
        resetOrderItem();
        closeCheckOutModel();
      }, 2000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending order, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModelContainer isModelOpen={isModelOpen}>
      <article className="w-10/12 md:w-9/12 lg:w-5/12 p-6 md:p-10 flex flex-col gap-6 bg-white rounded-2xl shadow-xl">
        
        <p className={`text-base sm:text-lg px-5 text-center ${emailSent ? 'text-green-600' : 'text-main'}`}>
          {emailSent ? '✅ Order sent successfully! Thank you' : '✅ Thank you for your order! We will contact you soon'}
        </p>

        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-main mb-2">Customer Information:</h3>
          <p><strong>Name:</strong> {userData.userName}</p>
          <p><strong>Phone:</strong> {userData.userNumber}</p>
        </div>

        <div className="flex justify-between text-sm sm:text-base border-2 border-main rounded-xl overflow-hidden">
          <div className="w-1/2 py-4 px-3 text-center border-r-2 border-main font-semibold">
            Number of Items:
            <span className="ml-1 font-mono text-main">{totalQuantity}</span>
          </div>
          <div className="w-1/2 py-4 px-3 text-center font-semibold">
            Total Price:
            <span className="ml-1 font-mono text-main">${totalPrice} EGP</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 text-base sm:text-lg">
          <button
            onClick={closeCheckOutModel}
            className="border-2 border-main text-main font-medium px-5 py-2 rounded-xl cursor-pointer hover:shadow-xs"
            disabled={isLoading}
          >
            Close
          </button>
          
          <button
            onClick={sendOrder}
            disabled={isLoading || emailSent}
            className={`text-white font-medium px-5 py-2 rounded-xl transition duration-300 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 
              emailSent ? 'bg-green-500' : 'bg-main hover:bg-opacity-90 cursor-pointer'
            }`}
          >
            {isLoading ? 'Sending...' : emailSent ? 'Sent!' : 'Confirm Order'}
          </button>
        </div>
        
      </article>
    </ModelContainer>
  );
}

export default CheckOutModel;