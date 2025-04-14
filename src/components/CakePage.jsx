// src/components/CakePage.jsx - Modified to include confetti on load
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import Cake from './Cake';
import confetti from 'canvas-confetti';

const CakePage = () => {
  // Fixed name - Kika
  const name = "Kika";
  const [candles, setCandles] = useState(0);
  const [showCandles, setShowCandles] = useState(false);
  const [songPlayedOnce, setSongPlayedOnce] = useState(false);
  const [blowDetected, setBlowDetected] = useState(false);
  const { playBirthdaySong, stopBirthdaySong, isPlaying } = useAudio();
  const navigate = useNavigate();
  
  // Calculate positions for candles
  const [elementPositions, setElementPositions] = useState([]);
  // Keep track of used angles to avoid overlap
  const [usedAngles, setUsedAngles] = useState([]);
  
  // Add confetti on page load
  useEffect(() => {
    // Launch confetti when page loads
    launchConfetti();
  }, []);

  // Function to launch confetti
  const launchConfetti = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Launch confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };
  
  // Function to get random number in range
  const getRandomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Function to randomly select from specific y values
  const getRandomYPosition = () => {
    const yOptions = [5, 2, -1];
    const randomIndex = Math.floor(Math.random() * yOptions.length);
    return yOptions[randomIndex];
  };

  // Function to generate a position for a new candle with unique angle
  const generateCandlePosition = () => {
    // Cake dimensions - now matched to CSS cake dimensions
    const cakeWidth = 250; // width from Cake.scss
    
    // Define the region for candle placement on the cake frosting
    const centerX = cakeWidth / 2;
    const baseRadius = 70; // Base radius for positioning on the CSS cake
    
    // Define possible angle sectors (10 sectors around the cake top)
    const possibleSectors = Array.from({ length: 10 }, (_, i) => i * 36 - 90); // 10 sectors of 36 degrees each
    
    // Filter out already used sectors
    const availableSectors = possibleSectors.filter(sector => !usedAngles.includes(sector));
    
    // If all sectors are used, reset (this shouldn't happen with max 10 candles)
    const selectedSector = availableSectors.length > 0 
      ? availableSectors[Math.floor(Math.random() * availableSectors.length)]
      : possibleSectors[Math.floor(Math.random() * possibleSectors.length)];
    
    // Update used angles
    setUsedAngles(prev => [...prev, selectedSector]);
    
    // Add some randomness to the angle (±10 degrees)
    const randomAngleOffset = getRandomInRange(-10, 10);
    const angle = selectedSector + randomAngleOffset;
    const radian = angle * Math.PI / 180;
    
    // Add some randomness to the radius (±10px)
    const randomRadiusOffset = getRandomInRange(-10, 10);
    const radius = baseRadius + randomRadiusOffset;
    
    // Calculate position with randomized components
    const x = centerX + radius * Math.cos(radian);
    const y = getRandomYPosition(); // Random y position from options: 5, 2, -1
    
    return { x, y };
  };
  
  useEffect(() => {
    // Only generate positions for new candles
    if (showCandles && elementPositions.length < candles) {
      const newPositions = [...elementPositions];
      
      // Add positions only for the new candles
      for (let i = elementPositions.length; i < candles; i++) {
        newPositions.push(generateCandlePosition());
      }
      
      setElementPositions(newPositions);
    }
  }, [candles, showCandles]);

  const handleCakeClick = () => {
    if (!showCandles) {
      setShowCandles(true);
      setCandles(1); // Start with 1 candle
      setBlowDetected(false);
      setUsedAngles([]); // Reset used angles when starting fresh
      
      if (!isPlaying) {
        playBirthdaySong();
      }
    } else {
      // Add one more candle on each subsequent click, up to 10
      setCandles(prev => Math.min(prev + 1, 10));
      setBlowDetected(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopBirthdaySong();
    } else {
      playBirthdaySong();
    }
  };

  const handleBlowCandles = () => {
    setBlowDetected(true);
    // Re-launch confetti when candles are blown out
    launchConfetti();
  };

  // Track when song completes playing once
  useEffect(() => {
    if (!isPlaying && showCandles) {
      setSongPlayedOnce(true);
    }
  }, [isPlaying, showCandles]);

  const goToGifts = () => {
    navigate('/gifts');
  };

  const goToMain = () => {
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-purple-300 flex flex-col items-center justify-center text-white">
      <div className="text-4xl w-10/12 font-bold mb-8 text-center">
        Happy 19th Birthday {name}!
      </div>
      
      <div className="mb-8">
        <div className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600">
          Number of candles on cake: {candles}
        </div>
      </div>
      
      <div 
        className="relative cursor-pointer w-64 h-64" 
        onClick={handleCakeClick}
      >
        {/* Use Cake component */}
        <Cake 
          elementPositions={showCandles ? elementPositions : []} 
          blowDetected={blowDetected} 
        />
      </div>
      
      {showCandles && !blowDetected && (
        <button 
          onClick={handleBlowCandles}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Blow Candles
        </button>
      )}
      
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
      
      {(showCandles && (blowDetected || songPlayedOnce)) && (
        <button 
          onClick={goToMain}
          className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition duration-300 animate-pulse"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default CakePage;