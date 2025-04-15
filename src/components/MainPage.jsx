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
    <div className="w-full h-16 sm:h-18 md:h-20 lg:h-18 xl:h-20 mb-2">
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
            className="w-full h-full object-cover rounded-lg"
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
    <div className="min-h-screen bg-purple-300 p-4 flex flex-col">
      {/* Header section with arrow and HBD image */}
      <div className="w-full h-56 mb-4 items-end align-bottom self-end">
        <div className="flex items-center justify-center h-full">
          {/* Arrow positioned on the left */}
          <div className="mr-2 sm:w-32 md:mr-4 lg:mr-10 w-32 lg:w-52">
            <img className="w-full sm:w-full md:w-20 lg:w-full h-auto" src={arrow} alt="Arrow" />
          </div>
          {/* Happy Birthday banner */}
          <div className="flex justify-center w-64 sm:w-64 lg:w-80 lg:mr-52">
            <img className="h-full sm:h-full md:h-20 lg:h-full w-auto" src={hbd} alt="Happy Birthday Banner" />
          </div>
        </div>
      </div>
      
      {/* Added a wrapper div with overflow-hidden to prevent content from overlapping */}
      <div className="max-w-6xl lg:max-w-7xl mx-auto w-full overflow-hidden">
        {/* Main content area with responsive layout - Modified for tablet view */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-row lg:flex-nowrap lg:gap-4 xl:gap-6">
          {/* PHOTO SLIDESHOW - Modified for tablet view (50% width) */}
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:pr-2 lg:pr-0 lg:mb-0">
            {/* Use aspect-square class to maintain 1:1 aspect ratio */}
            <div className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
              <ImageSlideshow images={images} currentSlide={currentSlide} />
            </div>
          </div>
          
          {/* BIRTHDAY LETTER CARD - Modified for tablet view (50% width) */}
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:pl-2 lg:pl-0 lg:mb-0">
            <div 
              className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full aspect-square flex flex-col cursor-pointer transform transition hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              <div className="bg-pink-500 text-white font-bold py-1 px-3 rounded-full mb-2 sm:mb-4 w-fit self-center text-sm sm:text-base">
                README
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 text-center">Birthday Letter</h2>
              <div className="flex-grow flex flex-col items-center justify-center">
                <p className="text-gray-600 mb-4 text-center text-sm sm:text-base">Click to read your special birthday message</p>
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
          
          {/* SPOTIFY SECTION - Modified to be below other sections on tablet */}
          <div className="w-full md:w-full lg:w-1/3 md:mt-4 lg:mt-0">
            <div className="aspect-square px-2 py-3 sm:px-4 sm:py-4 w-full lg:p-0 lg:pl-4 flex flex-col">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 text-center">Songs that reminds me of you</h2>
              <div className="w-full mx-auto flex-grow flex flex-col justify-between"> 
                {spotifyEmbeds.map((embed, index) => (
                  <SpotifyEmbed key={index} src={embed} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation button to the cake - Added proper spacing and z-index */}
      <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-8 flex justify-center pb-4 relative z-10">
        <Link 
          to="/gifts"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition duration-300 text-sm sm:text-base"
        >
          Click ME!
        </Link>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md md:max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
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
            <div className="mt-6 flex justify-end">
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