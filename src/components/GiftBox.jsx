// src/components/GiftBox.jsx
import React from 'react';
import gift from '../assets/gift.svg';

const GiftBox = ({ onClick }) => {
  return (
    <div 
      className="gift-box cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img 
        src={gift}
        alt="Gift Box" 
        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg"/>
      <div className="mt-2 sm:mt-4 text-lg sm:text-xl font-semibold text-center">Click to Open</div>
    </div>
  );
};

export default GiftBox;