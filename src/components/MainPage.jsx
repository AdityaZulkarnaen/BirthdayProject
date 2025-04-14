// src/components/MainPage.jsx
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import k1 from '../assets/k1.jpg';
import k2 from '../assets/k2.jpg';
import k3 from '../assets/k3.jpg';
import hbd from '../assets/HBD.png';
import arrow from '../assets/arrow.gif';

// Memoized Spotify embed component to prevent re-rendering
const SpotifyEmbed = memo(({ src }) => {
  return (
    <div className="lg:h-[110px] w-80 h-20 lg:w-[440px] md:h-full flex flex-col mb-4">
      <div 
        className="w-full h-full" 
        dangerouslySetInnerHTML={{
          __html: `<iframe style="border-radius:12px" src="${src}" width="100%" height="auto" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
        }}
      />
    </div>
  );
});

// Memoized image slideshow component
const ImageSlideshow = memo(({ images, currentSlide }) => {
  return (
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
  );
});

const MainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const images = [k3, k2, k1];
  
  // Spotify playlist embed URLs - stored as constants to prevent recreation
  const spotifyEmbeds = [
    "https://open.spotify.com/embed/track/4EMTe461jubpxPqFfVA0Rp?utm_source=generator",
    "https://open.spotify.com/embed/track/25gacl0dFF9HTclx7Ug7xC?utm_source=generator",
    "https://open.spotify.com/embed/track/5LZ4YMkDx5hY7N9QsH4KTd?utm_source=generator"
  ];
  
  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const birthdayMessage = `
    HBD KIKKKK
    
    Selamat ulang tahun yang ke 19 yahhh kikaa, strongest girl i ever knew. aku ngerasa belom sempet bilang ini ke kamu, aku cuma pengen nyampein klo aku bangga banget sm kamu apapun hasilnya karena aku tau kalo kamu udah berjuang keras buat ke titik sekarang ini. uda si itu doang keknya wkwkkwk bingung mo nulis apa pls?? intinya im proud of u n' wish u all the best dan semoga kuliahnya lancar aamiin aamiin aamiin
  `;

  return (
    <div className="min-h-screen bg-purple-300 p-4 sm:pt-0 sm:px-8 sm:pb-8">
      {/* Header section with arrow and HBD image */}
      <div className="w-full h-auto mb-4 sm:mb-0">
        <div className="flex flex-row items-center justify-center">
          {/* Arrow positioned on the left on mobile */}
          <div className="flex-none mr-2 sm:mr-4">
            <img className="w-16 sm:w-24 md:w-40 h-auto" src={arrow} alt="Arrow" />
          </div>
          {/* Happy Birthday banner */}
          <div className="flex-grow flex justify-center">
            <img className="w-64 sm:w-auto sm:h-20 md:w-72 md:h-auto" src={hbd} alt="Happy Birthday Banner" />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Main content area with responsive layout */}
        <div className="flex flex-col lg:flex-row md:flex-col xs:flex-row sm:flex-col justify-between space-y-4">
          {/* Photos and Letter - Stacked on mobile, side-by-side on tablet/desktop */}
          <div className="flex w-full  items-center  justify-items-center justify-center flex-col sm:space-x-6 sm:flex-row lg:w-[100%] md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            {/* LEFT COLUMN - Photo Slideshow */}
            <div className="w-[80%] h-60 flex justify-self-center lg:w-1/2 sm:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden sm:h-80 lg:h-96">
              <ImageSlideshow className='flex justify-self-center' images={images} currentSlide={currentSlide} />
            </div>
            
            {/* MIDDLE COLUMN - Letter Card */}
            <div className="w-[80%] lg:w-1/2 md:w-1/3 sm:w-1/2 flex flex-col h-64 sm:h-80 lg:h-96">
              <div 
                className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full h-full flex flex-col cursor-pointer transform transition hover:scale-105"
                onClick={() => setShowModal(true)}
              >
                <div className="bg-pink-500 text-white font-bold py-1 px-3 sm:px-4 rounded-full mb-2 sm:mb-4 w-fit self-center text-sm sm:text-base">
                  README
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 text-center">Birthday Letter</h2>
                <div className="flex-grow flex flex-col items-center justify-center">
                  <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">Click to read your special birthday message</p>
                  <div className="mt-auto mb-2 sm:mb-4">
                    {/* Decorative elements */}
                    <div className="flex justify-center space-x-4 sm:space-x-6">
                      <div className="text-2xl sm:text-3xl">⭐</div>
                      <div className="text-2xl sm:text-3xl">🌷</div>
                      <div className="text-2xl sm:text-3xl">🍰</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* SPOTIFY SECTION - Always below in both mobile and tablet */}
          <div className="w-[80%] mt-2 self-center">
            <div className="rounded-lg px-2 sm:px-4 w-full flex flex-col items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 text-center">Songs that reminds me of you</h2>
              <div className="spotify-container w-[230px] flex flex-col items-center  sm:space-y-4"> 
                {/* Use memo components to prevent re-rendering with reduced spacing */}
                {spotifyEmbeds.map((embed, index) => (
                  <SpotifyEmbed key={index} src={embed} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation button to the cake - centered at bottom */}
        <div className="mt-4 sm:mt-6 flex justify-center">
          <Link 
            to="/gifts"
            className="px-4 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition duration-300 text-sm sm:text-base"
          >
            Click ME!
          </Link>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md md:max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Birthday Message</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="whitespace-pre-line text-gray-700 text-sm sm:text-base">
              {birthdayMessage}
            </div>
            <div className="mt-4 sm:mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300 text-sm sm:text-base"
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