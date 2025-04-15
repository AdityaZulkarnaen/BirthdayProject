// src/components/Vouchers.jsx
import React, { useState } from 'react';

const Vouchers = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  
  const vouchers = [
    {
      id: "001",
      title: "DINNER AND A MOVIE",
      color: "bg-red-500",
      validUntil: "APRIL 2026"
    },
    {
      id: "002",
      title: "TIMEZONE / FUNWORLD",
      color: "bg-teal-500",
      validUntil: "APRIL 2026"
    },
    {
      id: "003",
      title: "GIFT OF MY CHOICE",
      color: "bg-yellow-500",
      validUntil: "APRIL 2026"
    },
    {
      id: "004",
      title: "ESP CONCERT",
      color: "bg-teal-500", 
      validUntil: "APRIL 2026"
    },
    {
      id: "005",
      title: "MAKAN SUSHI ENAK",
      color: "bg-yellow-500",
      validUntil: "APRIL 2026"
    },
    {
      id: "006",
      title: "ONE WISH GRANTED",
      color: "bg-red-500",
      validUntil: "APRIL 2026"
    },
  ];
  
  const handleVoucherClick = (id) => {
    setSelectedVoucher(id === selectedVoucher ? null : id);
  };
  
  return (
    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl px-2">
      <h2 className="text-xl sm:text-2xl font-bold mb-0 sm:mb-2 text-center">Your Birth Day Coupons</h2>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">pilih satu yahh</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {vouchers.map((voucher) => (
          <div 
            key={voucher.id}
            className={`${voucher.color} rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105 ${selectedVoucher === voucher.id ? 'ring-4 ring-white' : ''}`}
            onClick={() => handleVoucherClick(voucher.id)}
          >
            <div className="p-3 sm:p-4 flex flex-col h-full">
              <div className="text-xs mb-1">BIRTHDAY COUPON</div>
              <div className="text-xs mb-2 sm:mb-3">THIS COUPON IS VALID FOR:</div>
              <div className="text-base sm:text-xl font-bold mb-2 sm:mb-4 flex-grow">{voucher.title}</div>
              <div className="text-xs size-fit">VALID UNTIL {voucher.validUntil}</div>
              <div className="flex justify-end">
                <div className="bg-gray-800 text-white px-2 sm:px-3 py-1 rounded-lg text-xs font-mono">
                  CODE: {voucher.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vouchers;