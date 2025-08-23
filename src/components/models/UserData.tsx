import React, { useState } from 'react';
import ModelContainer from './ModelContainer';
import { SquareX } from 'lucide-react';
import CheckOutModel from './CheckOutModel';
import { useOrderContext } from '@/src/contexts/OrderProvider';

function UserData({
  closeUserDataModel,
  isModelOpen,
}: {
  closeUserDataModel: () => void;
  isModelOpen: boolean;
}) {
  const { addUserData } = useOrderContext();
  const [isCheckModelOpen, setIsCheckModelOpen] = useState(false);

  const toggleCheckModel = () => {
    setIsCheckModelOpen((prev) => !prev);
  };

  const [userData, setUserData] = useState({
    userName: '',
    userNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (!userData.userName.trim() || !userData.userNumber.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    addUserData(userData.userName, userData.userNumber);
    setIsCheckModelOpen(true);
  };

  return (
    <>
      <ModelContainer isModelOpen={isModelOpen}>
        <div className="
          relative flex justify-center
          w-4/5 md:w-2/5
          bg-Aside
          rounded-2xl py-8
          px-6 bg-white
        ">
          <div
            onClick={() => closeUserDataModel()}
            className="absolute top-2 right-2 text-red-500 cursor-pointer"
          >
            <SquareX size={30} />
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="userNumber"
                value={userData.userNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-main text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300"
            >
              Next
            </button>
          </form>
        </div>
      </ModelContainer>

      <CheckOutModel 
        closeCheckOutModel={toggleCheckModel} 
        isModelOpen={isCheckModelOpen}
      />
    </>
  );
}

export default UserData;