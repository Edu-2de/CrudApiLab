'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Carrousel() {
  const carrouselItems = [
    {
      src: '/photo1.jpg',
      alt: 'Description 1',
    },
    {
      src: '/photo2.jpg',
      alt: 'Description 2',
    },
    {
      src: '/photo3.jpg',
      alt: 'Description 3',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = carrouselItems[currentIndex];

  const prevSlide = React.useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? carrouselItems.length - 1 : prev - 1));
  }, [carrouselItems.length]);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex(prev => (prev === carrouselItems.length - 1 ? 0 : prev + 1));
  }, [carrouselItems.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev == carrouselItems.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [carrouselItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative w-screen min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-neutral-100 px-0 py-0 md:mt-15">
      <div className="relative w-full mx-auto overflow-hidden flex justify-center">
        <Image className="rounded-2xl" src={currentItem.src} alt={currentItem.alt} width={1800} height={600} />
      </div>
      {/* Controls */}
      <div className="absolute top-1/2 left-0 w-full flex justify-between items-center px-18 -translate-y-1/12 pointer-events-none">
        <div className="pointer-events-auto">
          <button
            onClick={prevSlide}
            className="bg-white/90 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 rounded-full w-14 h-14 flex items-center justify-center shadow cursor-pointer "
            aria-label="prev"
          >
            <span className="text-3xl font-bold mb-1">&lt;</span>
          </button>
        </div>
        <div className="pointer-events-auto">
          <button
            onClick={nextSlide}
            className="bg-white/90 hover:bg-neutral-200 text-neutral-700 border border-neutral-300 rounded-full w-14 h-14 flex items-center justify-center shadow cursor-pointer "
            aria-label="next"
          >
            <span className="text-3xl font-bold mb-1">&gt;</span>
          </button>
        </div>
      </div>
      
    </div>
  );
}
