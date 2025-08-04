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

  // If pants is selected, swap the order of image/text
  const Content = () => (
    <>
      {/* Image */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-black/5 min-h-[350px] md:min-h-[500px]">
        <div className="relative w-auto h-auto max-w-full max-h-[500px] flex items-center justify-center">
          <Image
            src={part.img}
            alt={part.title}
            width={500}
            height={500}
            className="object-contain"
            priority
            style={{ maxWidth: '100%', maxHeight: '500px', width: 'auto', height: 'auto' }}
          />
        </div>
      </div>
      {/* Text & Actions */}
      <div className="relative w-full md:w-1/2 bg-white flex flex-col items-start justify-center py-12 px-8 md:px-16 min-h-[350px]">
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
    <section className="w-full flex flex-col md:flex-row items-stretch justify-center min-h-[500px] mt-16">
      {showShorts ? <Content /> : <Content />}
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            flex-direction: ${showShorts ? 'row' : 'row-reverse'};
          }
        }
      `}</style>
    </section>
  );
}