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
  const [transitioning, setTransitioning] = useState(false);

  const prevSlide = React.useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex(prev => (prev === 0 ? carrouselItems.length - 1 : prev - 1));
  }, [carrouselItems.length, transitioning]);

  const nextSlide = React.useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex(prev => (prev === carrouselItems.length - 1 ? 0 : prev + 1));
  }, [carrouselItems.length, transitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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

  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => setTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  return (
    <div className="relative w-screen min-h-[50vh] md:min-h-[60vh] flex items-center justify-center bg-transparent px-0 py-0 md:mt-15 left-[0%]">
      <div className="relative w-full mx-auto overflow-hidden flex justify-center">
        <div
          className={`relative w-full flex items-center justify-center select-none cursor-pointer `}
          style={{ height: 600, maxWidth: 1800 }}
        >
          <Image
            className={`rounded-2xl transition-all duration-500 ease-in-out select-none ${transitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            src={carrouselItems[currentIndex].src}
            alt={carrouselItems[currentIndex].alt}
            width={1950}
            height={600}
            draggable={false}
            priority
          />
          <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-3 z-10">
            {carrouselItems.map((item, idx) => (
              <button
                key={item.src}
                onClick={() => !transitioning && setCurrentIndex(idx)}
                className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300
                  ${currentIndex === idx ? 'bg-white shadow-lg scale-110' : 'bg-gray-400 opacity-60'}
                  hover:scale-110`}
                aria-label={`Go to slide ${idx + 1}`}
                style={{ outline: 'none' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}