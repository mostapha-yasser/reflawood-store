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
    const [error, setError] = useState("")

  const [userData, setUserData] = useState({
    userName: '',
    userNumber: '',
    userAddress:''
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
    
    if (!userData.userName.trim() || !userData.userNumber.trim() || !userData.userAddress.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (userData.userName.trim().length < 3) {
      setError('Name must be at least 3 characters long');
      return;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(userData.userNumber.trim())) {
      setError('Phone number must be between 10 and 15 digits and contain only numbers');
      return;
    }

    setError("");
    addUserData(userData.userName, userData.userNumber,userData.userAddress);
    closeUserDataModel()
    setIsCheckModelOpen(true);
  };

  return (
    <>
      <ModelContainer isModelOpen={isModelOpen}>
        <div className="
          relative flex flex-col items-center
          w-4/5 md:w-3/5 lg:w-2/5
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
               <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="userAddress"
                value={userData.userAddress}
                onChange={handleChange}
                placeholder="Enter your name"
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
          <p className='min-h-1 text-red-400'>{error}</p>
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