'use client';
import React, { useState, useEffect } from 'react';

export default function Carrousel() {
  const carrouselItems = [
    {
      title: 'Welcome to Project 1',
      description: 'The best crudApiLab',
      backgroundColor: 'bg-amber-100',
    },
    {
      title: 'This is the Local',
      description: 'The best crudApiLab',
      backgroundColor: 'bg-amber-200',
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
    <div className="relative w-screen min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-neutral-100 px-0 py-0 mt-24 md:mt-30">
      <div className="relative w-full mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white/90">
        <div
          className="flex flex-col items-center justify-center h-[40vh] md:h-[60vh] px-6 md:px-24 transition-all duration-700"
          style={{ backgroundColor: currentItem.backgroundColor, minHeight: 320 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-800 mb-6 text-center drop-shadow-sm tracking-tight">
            {currentItem.title}
          </h2>
          <p className="mt-2 text-2xl md:text-4xl text-neutral-700 text-center max-w-2xl font-medium">
            {currentItem.description}
          </p>
        </div>
      </div>
    </div>
  );
}
