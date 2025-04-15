// src/components/IOSAudioEnabler.jsx
import React, { useEffect, useRef, useState } from 'react';

const IOSAudioEnabler = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Check if device is iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);
    
    // Create a silent audio element that we can play to unlock audio on iOS
    if (iOS && !audioRef.current) {
      const audio = document.createElement('audio');
      audio.src = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTgueC4xMDAAAAAAAAAAAAAAAP/7kGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAAAwAABPQA7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u//uQZAAAA8AAAP8AAAAgAAA/wAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
      audio.load();
      audioRef.current = audio;
      
      // Add event listeners to unlock audio on user interaction
      const unlockAudio = () => {
        // Play the silent sound
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio playback started successfully
              setAudioEnabled(true);
              
              // Remove event listeners once audio is enabled
              document.removeEventListener('touchstart', unlockAudio);
              document.removeEventListener('touchend', unlockAudio);
              document.removeEventListener('click', unlockAudio);
            })
            .catch(error => {
              // Auto-play was prevented
              console.log('Audio playback was prevented:', error);
            });
        }
      };
      
      // Add event listeners for user interaction
      document.addEventListener('touchstart', unlockAudio);
      document.addEventListener('touchend', unlockAudio);
      document.addEventListener('click', unlockAudio);
      
      return () => {
        document.removeEventListener('touchstart', unlockAudio);
        document.removeEventListener('touchend', unlockAudio);
        document.removeEventListener('click', unlockAudio);
      };
    }
  }, []);
  
  if (!isIOS || audioEnabled) {
    return null; // Don't render anything if not iOS or audio is already enabled
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.play()
              .then(() => {
                setAudioEnabled(true);
              })
              .catch(error => {
                console.log('Audio playback was prevented:', error);
              });
          }
        }}
      >
        Enable Audio
      </button>
    </div>
  );
};

export default IOSAudioEnabler;