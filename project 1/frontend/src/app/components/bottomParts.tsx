'use client';
import { useState } from 'react';
import Image from 'next/image';

const shorts = {
  img: '/shorts.jpg',
  title: 'WINTER 2025',
  subtitle: 'LATEST DROP',
  description: 'Discover our new shorts collection for the season. Comfort and style for every moment.',
  shopMen: true,
  shopWomen: true,
};

const pants = {
  img: '/pants.jpg',
  title: 'WINTER 2025',
  subtitle: 'LATEST DROP',
  description: 'Explore our new pants collection. Perfect fit and modern design for your winter.',
  shopMen: true,
  shopWomen: true,
};

export default function BottomParts() {
  const [showShorts, setShowShorts] = useState(true);

  const part = showShorts ? shorts : pants;

  const flexDirection = showShorts
    ? 'md:flex-row'
    : 'md:flex-row-reverse';

  const Content = () => (
    <>
      {/* Image */}
      <div className="relative w-full md:w-1/2 min-h-[450px] md:min-h-[700px] h-[450px] md:h-auto">
        <Image
          src={part.img}
          alt={part.title}
          fill
          className="object-cover w-full h-full"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* Text & Actions */}
      <div className="relative w-full md:w-1/2 bg-white flex flex-col items-start justify-center py-16 px-8 md:px-20 min-h-[450px] md:min-h-[700px]">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{part.title}</h2>
        <div className="text-lg md:text-xl font-medium text-gray-700 mb-2">{part.subtitle}</div>
        <div className="text-base md:text-lg text-gray-500 mb-8 max-w-md">{part.description}</div>
        <div className="flex gap-4 mb-8">
          {part.shopMen && (
            <button className="px-6 py-2 rounded-full border border-black text-black font-semibold bg-transparent hover:bg-black hover:text-white transition">
              Shop Men
            </button>
          )}
          {part.shopWomen && (
            <button className="px-6 py-2 rounded-full border border-black text-black font-semibold bg-transparent hover:bg-black hover:text-white transition">
              Shop Women
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <button
            className={`px-6 py-2 rounded-full font-bold border-2 transition ${
              showShorts
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-black border-black hover:bg-black hover:text-white'
            }`}
            onClick={() => setShowShorts(true)}
          >
            Shorts
          </button>
          <button
            className={`px-6 py-2 rounded-full font-bold border-2 transition ${
              !showShorts
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-black border-black hover:bg-black hover:text-white'
            }`}
            onClick={() => setShowShorts(false)}
          >
            Pants
          </button>
        </div>
      </div>
    </>
  );

  return (
    <section className={`w-full flex flex-col ${flexDirection} items-stretch justify-center min-h-[900px] mt-16`}>
      <Content />
    </section>
  );
}