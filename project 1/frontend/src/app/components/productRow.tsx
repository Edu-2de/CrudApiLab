import Image from "next/image";
import React, { useState } from 'react';
const cardColors = ['bg-[#8c9ca2]', 'bg-[#5c6150]', 'bg-[#8c8b91]', 'bg-[#8c8584]'];

export default function ProductRow() {
  const categories = [
    {
      title: 'Best Sellers',
      options: {
        option1: 'shop men',
        option2: 'shop women',
      },
      src: '/shoe1.jpg',
      src1: '/shoe1Variation.jpg'
    },
    {
      title: 'New Arrivals',
      options: {
        option1: 'shop men',
        option2: 'shop women',
      },
      src: '/shoe2.jpg',
      src1: '/shoe2Variation.jpg'
    },
    {
      title: 'Mens',
      options: {
        option1: 'shop men',
      },
      src: '/shoe3.jpg',
      src1: '/shoe3Variation.jpg'
    },
    {
      title: 'Womans',
      options: {
        option1: 'shop women',
      },
      src: '/shoe4.jpg',
      src1: '/shoe4Variation.jpg'
    },
  ];

  return (
    <div className="relative w-screen min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-0 py-0 mt-24 md:mt-1">
      <div className="relative h-[70vh] w-full max-w-[90%] mx-auto overflow-hidden flex gap-6 p-8 transition-all duration-700 ease-in-out">
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className={`group rounded-lg shadow p-6 flex flex-col items-center min-h-[200px] min-w-[200px] justify-center hover:rounded-[46%] transition-all duration-900 ease-in-out select-none cursor-pointer ${cardColors[idx % cardColors.length]}`}
            style={{
              backgroundImage: `url(${cat.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundImage = `url(${cat.src1})`}
            onMouseLeave={e => e.currentTarget.style.backgroundImage = `url(${cat.src})`}
          >
            <h3 className="relative text-lg text-white mb-2 transition-all duration-700 ease-in-out border-2 border-white px-4 py-2 rounded-4xl group-hover:border-transparent group-hover:font-semibold">{cat.title}</h3>
            <div className="flex flex-col gap-2 w-2xl max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-700 ease-in-out">
              {Object.values(cat.options).map((opt, i) => (
                <button key={i} className="relative left-[40%] rounded-4xl cursor-pointer text-gray-800 px-4 py-2 border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:border-white hover:bg-white hover:text-gray-800 transition-all duration-700 ease-in-out max-w-[20%]">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}