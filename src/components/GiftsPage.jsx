// src/components/GiftsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GiftBox from './GiftBox';
import Vouchers from './Vouchers';

const GiftsPage = () => {
  const [showVouchers, setShowVouchers] = useState(false);
  
  const handleGiftClick = () => {
    setShowVouchers(true);
  };
  
  return (
    <div className="min-h-screen bg-purple-300 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-center">Your Special Gifts</h1>
      
      {!showVouchers ? (
        <div className="flex flex-col items-center">
          <p className="text-base sm:text-lg mb-6 sm:mb-10 text-center">Click the gift box to see what's inside!</p>
          <GiftBox onClick={handleGiftClick} />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <Vouchers />
          <Link to="/" className="mt-6 sm:mt-8 px-4 py-2 sm:px-6 sm:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200 text-sm sm:text-base">
            Back to Cake
          </Link>
        </div>
      )}
    </div>
  );
};

export default GiftsPage;