import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import k1 from '../assets/k1.jpg'; // Replace with your actual image import
import k2 from '../assets/k2.jpg'; // Replace with your actual image import
import k3 from '../assets/k3.jpg'; // Replace with your actual image import
import hbd from '../assets/HBD.png'; // Replace with your actual image import

const MainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  // These would be your imported images in production
  // For this example, we'll use placeholder URLs that would be replaced with your actual imports
  const images = [
    k3, // This would be your first selfie image
    k2, // This would be your second selfie image
    k1, // This would be your third selfie image
  ];
  
  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const birthdayMessage = `
    Dear Kika,
    
    Happy 19th Birthday! 🎂
    
    On this special day, I want to celebrate all the joy and happiness you bring to my life. You are an amazing person with a beautiful heart and a bright future ahead.
    
    May this year bring you endless opportunities, new adventures, and all the success you deserve. Know that I'm always here for you, cheering you on every step of the way.
    
    With love and best wishes,
    [Your Name]
  `;

  return (
    <div className="min-h-screen bg-purple-300 pt-6 pl-8 pb-8 pr-8">
      <div className='w-full h-auto'>
        <img className='flex justify-self-center w-xs h-auto'
          src={hbd} // Replace with your actual image import
          />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {/* LEFT COLUMN - Photo Slideshow */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden h-96">
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute w-full h-full transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Slide ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* MIDDLE COLUMN - Letter Card */}
          <div className="w-full md:w-1/3 flex flex-col h-96">
            <div 
              className="bg-white rounded-lg p-6 shadow-lg w-full h-full flex flex-col cursor-pointer transform transition hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              <div className="bg-pink-500 text-white font-bold py-1 px-4 rounded-full mb-4 w-fit self-center">
                README
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Birthday Letter</h2>
              <div className="flex-grow flex flex-col items-center justify-center">
                <p className="text-gray-600 mb-6 text-center">Click to read your special birthday message</p>
                <div className="mt-auto mb-4">
                  {/* Decorative elements */}
                  <div className="flex justify-center space-x-6">
                    <div className="text-3xl">⭐</div>
                    <div className="text-3xl">🌷</div>
                    <div className="text-3xl">🍰</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
              </div>
            </div>
          </div>
          
          {/* RIGHT COLUMN - Spotify Playlist */}
          <div className="w-full md:w-1/3 flex flex-col h-96">
            <div className=" rounded-lg p-6 w-full h-[150px] flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Songs that reminds me of you</h2>
              <div className="flex-grow overflow-hidden">
              </div>
              <div className="h-full flex flex-col">
                  <div 
                    className="w-full h-full" 
                    dangerouslySetInnerHTML={{
                      __html: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4EMTe461jubpxPqFfVA0Rp?utm_source=generator" width="100%" height="auto" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                    }}
                  />
              </div>
              <div className="h-full flex flex-col">
                  <div 
                    className="w-full h-full" 
                    dangerouslySetInnerHTML={{
                      __html: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/25gacl0dFF9HTclx7Ug7xC?utm_source=generator" width="100%" height="auto" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                    }}
                  />
              </div>
              <div className="h-full flex flex-col">
                  <div 
                    className="w-full h-full" 
                    dangerouslySetInnerHTML={{
                      __html: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5LZ4YMkDx5hY7N9QsH4KTd?utm_source=generator" width="100%" height="auto" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                    }}
                  />
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation button to the cake - centered at bottom */}
        <div className="mt-8 flex justify-center">
          <Link 
            to="/gifts"
            className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition duration-300"
          >
            Click ME!
          </Link>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">My Birthday Message</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="whitespace-pre-line text-gray-700">
              {birthdayMessage}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;