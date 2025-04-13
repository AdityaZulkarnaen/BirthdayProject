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
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Your Special Gifts</h1>
      
      {!showVouchers ? (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-10">Click the gift box to see what's inside!</p>
          <GiftBox onClick={handleGiftClick} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Vouchers />
          <Link to="/" className="mt-8 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200">
            Back to Cake
          </Link>
        </div>
      )}
    </div>
  );
};

export default GiftsPage;