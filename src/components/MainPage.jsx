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
    <div className="h-full flex flex-col mb-2">
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
    <div className="min-h-screen bg-purple-300 pt-0 pl-8 pb-8 pr-8">
      <div className="w-full h-auto flex items-center justify-center">
        <div className="flex items-center mr-32">
          <img className="w-40 h-auto mr-4" src={arrow} alt="Arrow" />
          <img className="w-xs h-auto ml-36 mr-40" src={hbd} alt="Happy Birthday Banner" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {/* LEFT COLUMN - Photo Slideshow */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden h-96">
            <ImageSlideshow images={images} currentSlide={currentSlide} />
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
            <div className="rounded-lg pl-6 pr-6 w-full h-[110px] flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Songs that reminds me of you</h2>
              <div className="flex-grow overflow-hidden">
              </div>
              <div className="spotify-container h-full"> 
                {/* Use memo components to prevent re-rendering */}
                {spotifyEmbeds.map((embed, index) => (
                  <SpotifyEmbed key={index} src={embed} />
                ))}
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