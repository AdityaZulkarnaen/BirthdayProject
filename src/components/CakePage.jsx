// src/components/CakePage.jsx
import React, { useState } from 'react';
import cake from '../assets/cake.svg';
import { useAudio } from '../hooks/useAudio';

const CakePage = () => {
  // Fixed name - Kika
  const name = "Kika";
  const [candles, setCandles] = useState(0);
  const [showCandles, setShowCandles] = useState(false);
  const { playBirthdaySong, stopBirthdaySong, isPlaying } = useAudio();
  
  const handleCakeClick = () => {
    if (!showCandles) {
      setShowCandles(true);
      setCandles(1); // Default to 2 candles when first clicked
      
      if (!isPlaying) {
        playBirthdaySong();
      }
    } else {
      // Add one more candle on each subsequent click
      setCandles(prev => Math.min(prev + 1, 10)); // Max 10 candles
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopBirthdaySong();
    } else {
      playBirthdaySong();
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-white">
      <div className="text-4xl font-bold mb-8">
        Happy Birthday {name}!
      </div>
      
      <div className="mb-8">
        <div className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600">
          Number of candles on cake: {candles}
        </div>
      </div>
      
      <div 
        className="relative cursor-pointer" 
        onClick={handleCakeClick}
      >
        <img src={cake} alt="Birthday Cake" className="w-64" />
        
        {showCandles && (
          <div className="absolute top-0 left-0 w-full">
            <div className="flex justify-center">
              {Array.from({ length: candles }).map((_, index) => (
                <div key={index} className="relative mx-1">
                  {/* Candle */}
                  <div 
                    className="w-2 h-12 bg-red-500 rounded-sm mx-auto"
                    style={{
                      transform: `rotate(${Math.random() * 10 - 5}deg)`,
                      marginTop: `${Math.random() * 10}px`
                    }}
                  ></div>
                  
                  {/* Flame */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-2 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="w-4 h-6 bg-orange-400 rounded-full -mt-3 animate-flame"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      
      {(showCandles || isPlaying) && (
        <div className="mt-8 flex items-center">
          <button 
            onClick={handlePlayPause}
            className="bg-gray-700 p-2 rounded-full mr-2"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <div className="w-48 h-1 bg-gray-700 rounded-full">
            <div className={`h-full bg-white rounded-full ${isPlaying ? 'animate-progress' : 'w-0'}`}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CakePage;