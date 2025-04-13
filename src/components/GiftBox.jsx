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
        className="w-64 h-64 rounded-lg"/>
      <div className="mt-4 text-xl font-semibold text-center">Click to Open</div>
    </div>
  );
};

export default GiftBox;
