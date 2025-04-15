// src/components/CakePage.jsx
import React, { useState, useEffect, useRef } from 'react';
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
  const { playBirthdaySong, stopBirthdaySong, isPlaying, audioInitialized } = useAudio();
  const navigate = useNavigate();
  
  // Reference to the cake container for dynamic sizing
  const cakeContainerRef = useRef(null);
  
  // Calculate positions for candles
  const [elementPositions, setElementPositions] = useState([]);
  
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

  // Function to randomly select from specific y values - adjusted for better vertical positioning
  const getRandomYPosition = () => {
    const yOptions = [2, 0, -2]; // Adjusted to keep candles more on top of the cake
    const randomIndex = Math.floor(Math.random() * yOptions.length);
    return yOptions[randomIndex];
  };

  // Function to get the actual cake size
  const getCakeSize = () => {
    if (cakeContainerRef.current) {
      return cakeContainerRef.current.offsetWidth;
    }
    // Fallback to estimated size based on screen width
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) { // sm breakpoint
      return 208; // w-52
    } else if (screenWidth < 768) { // md breakpoint
      return 256; // w-64
    } else {
      return 288; // w-72
    }
  };

  // Function to generate a position for a new candle
  const generateNewCandlePosition = (existingPositions) => {
    // Get actual cake size
    const cakeWidth = getCakeSize();
    
    // Define the region for candle placement on the cake frosting
    const centerX = cakeWidth / 2;
    
    // Make base radius responsive to cake size
    const baseRadius = cakeWidth * 0.25;
    
    // Calculate how many candles we already have
    const candleCount = existingPositions.length;
    
    // Calculate a good position for the new candle based on existing candles
    // Use angle distribution to ensure even spacing around the cake
    const startAngle = -135;
    const angleSpan = 270;
    
    // For the new candle, calculate its position based on its index
    const baseAngle = startAngle + (candleCount * (angleSpan / Math.max(9, 1))); // Max 10 candles (0-9 indices)
    const randomAngleOffset = getRandomInRange(-10, 10);
    const angle = baseAngle + randomAngleOffset;
    const radian = angle * Math.PI / 180;
    
    // Vary radius slightly for natural look
    const radiusVariation = getRandomInRange(-5, 5);
    const radius = baseRadius + radiusVariation;
    
    // Calculate position
    const x = centerX -20 + radius * Math.cos(radian);
    
    // For mobile view, shift candles slightly toward center
    let adjustedX = x;
    if (cakeWidth < 220) { // For very small screens
      const centerCorrection = (x - centerX) * 0.2; // Pull 20% toward center
      adjustedX = x -10 - centerCorrection;
    }
    
    const y = getRandomYPosition();
    
    return { x: adjustedX, y };
  };
  
  // Function to recalculate all positions (only used for window resize)
  const recalculateAllPositions = () => {
    if (showCandles && candles > 0) {
      // Create new array for regenerated positions
      const newPositions = [];
      
      // Use the same algorithm, but generate for all candles at once
      const cakeWidth = getCakeSize();
      const centerX = cakeWidth / 2;
      const baseRadius = cakeWidth * 0.25;
      const startAngle = -135;
      const angleSpan = 270;
      
      for (let i = 0; i < candles; i++) {
        const baseAngle = startAngle + (i * (angleSpan / Math.max(candles - 1, 1)));
        const randomAngleOffset = getRandomInRange(-10, 10);
        const angle = baseAngle + randomAngleOffset;
        const radian = angle * Math.PI / 180;
        
        const radiusVariation = getRandomInRange(-5, 5);
        const radius = baseRadius + radiusVariation;
        
        const x = centerX + radius * Math.cos(radian);
        
        let adjustedX = x;
        if (cakeWidth < 220) {
          const centerCorrection = (x - centerX) * 0.2;
          adjustedX = x - centerCorrection;
        }
        
        const y = getRandomYPosition();
        
        newPositions.push({ x: adjustedX, y });
      }
      
      setElementPositions(newPositions);
    }
  };

  // Add resize listener to recalculate positions when window size changes
  useEffect(() => {
    const handleResize = () => {
      recalculateAllPositions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showCandles, candles]);
  
  // Effect to add new candle when candles count increases
  useEffect(() => {
    if (showCandles && elementPositions.length < candles) {
      // Only generate position for the newest candle
      const newPosition = generateNewCandlePosition(elementPositions);
      setElementPositions(prev => [...prev, newPosition]);
    }
  }, [candles, showCandles]);

  const handleCakeClick = () => {
    if (!showCandles) {
      setShowCandles(true);
      setCandles(1); // Start with 1 candle
      setBlowDetected(false);
      
      // Always try to play the song on click - this helps with iOS audio restrictions
      playBirthdaySong();
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

  const goToMain = () => {
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-purple-300 flex flex-col items-center justify-center text-white px-4 py-8">
      <div className="text-2xl sm:text-3xl md:text-4xl w-full sm:w-10/12 font-bold mb-4 sm:mb-8 text-center">
        Happy 19th Birthday {name}!
      </div>
      
      <div className="mb-4 sm:mb-8">
        <div className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-gray-700 text-white border border-gray-600 text-sm sm:text-base">
          Number of candles on cake: {candles}
        </div>
      </div>
      
      <div 
        ref={cakeContainerRef}
        className="relative cursor-pointer w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72" 
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
          className="mt-4 sm:mt-6 px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-sm sm:text-base"
        >
          Blow Candles
        </button>
      )}
      
      {(showCandles || isPlaying) && (
        <div className="mt-4 sm:mt-8 flex items-center">
          <button 
            onClick={handlePlayPause}
            className="bg-gray-700 p-1 sm:p-2 rounded-full mr-2"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <div className="w-32 sm:w-48 h-1 bg-gray-700 rounded-full">
            <div className={`h-full bg-white rounded-full ${isPlaying ? 'animate-progress' : 'w-0'}`}></div>
          </div>
        </div>
      )}
      
      {/* iOS audio helper button - visible only if audio isn't initialized yet */}
      {!audioInitialized && (
        <button 
          onClick={playBirthdaySong}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
        >
          Tap to Enable Music
        </button>
      )}
      
      {(showCandles && (blowDetected || songPlayedOnce)) && (
        <button 
          onClick={goToMain}
          className="mt-6 sm:mt-8 px-4 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition duration-300 animate-pulse text-sm sm:text-base"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default CakePage;