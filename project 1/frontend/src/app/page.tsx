'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
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
  const carrouselItem = carrouselItems[currentIndex];

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
    <div className="w-full bg-blue-950 bg-a h-auto">
      <h1 className="">Project1</h1>
    </div>
  );
}
