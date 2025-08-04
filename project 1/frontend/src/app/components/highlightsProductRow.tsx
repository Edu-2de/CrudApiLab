'use client';
import { useState } from 'react';
import Image from 'next/image';

const mockProducts = [
  { id: 1, img: '/product1.png', variation: '/product1Variation.png', price: 120 },
  { id: 2, img: '/product2.png', variation: '/product2Variation.png', price: 99 },
  { id: 3, img: '/product3.png', variation: '/product3Variation.png', price: 89 },
  { id: 4, img: '/product4.png', variation: '/product4Variation.png', price: 110 },
];

const imageTypes: Array<'main' | 'variation'> = ['main', 'variation'];

export default function HighlightsProductRow() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<{ [key: number]: 'main' | 'variation' }>({});

  const handleMouseEnter = (id: number) => {
    setHovered(id);
    setActiveImage(prev => ({ ...prev, [id]: 'variation' }));
  };
  const handleMouseLeave = (id: number) => {
    setHovered(null);
    setActiveImage(prev => ({ ...prev, [id]: 'main' }));
  };

  // Arrow navigation with looping
  const handleArrow = (id: number, direction: 'left' | 'right') => {
    setActiveImage(prev => {
      const current = prev[id] || 'main';
      let idx = imageTypes.indexOf(current);
      if (direction === 'right') {
        idx = (idx + 1) % imageTypes.length;
      } else {
        idx = (idx - 1 + imageTypes.length) % imageTypes.length;
      }
      return { ...prev, [id]: imageTypes[idx] };
    });
  };

  return (
    <section className="relative py-8 bg-transparent select-none">
      <div className="max-w-[1800px] mx-auto ">
        <h2 className="text-2xl md:text-1xl text-gray-900 text-start
         mb-1 font-semibold">Highlights</h2>
        <div className="flex w-full justify-center items-stretch  px-2">
          {mockProducts.map(product => {
            const showVariation = activeImage[product.id] === 'variation';
            return (
              <div
                key={product.id}
                className={`
                  group flex flex-col items-center justify-center
                  rounded-2xl bg-transparent shadow-none
                  transition-all duration-300
                  cursor-pointer
                  min-w-[460px] max-w-[600px] w-full
                `}
                style={{
                  minHeight: 750,
                  padding: '2.2rem 1rem 1.7rem 1rem',
                }}
                tabIndex={0}
                aria-label="Product"
                draggable={false}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={() => handleMouseLeave(product.id)}
              >
                <div
                  className={`
                    relative w-full h-[650px] rounded-xl mb-5
                    bg-[#e6e4da] flex items-center justify-center overflow-hidden
                  `}
                >
                  {/* Main image */}
                  <Image
                    src={product.img}
                    alt={`Product ${product.id}`}
                    fill
                    className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-all duration-500 ${
                      showVariation ? 'opacity-0 invisible' : 'opacity-100 visible'
                    }`}
                    draggable={false}
                    sizes="(max-width: 900px) 100vw, 900px"
                  />

                  {/* Variation image - cover entire area on hover */}
                  <Image
                    src={product.variation}
                    alt={`Product ${product.id} variation`}
                    fill
                    className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-all duration-500 ${
                      showVariation ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                    draggable={false}
                    sizes="(max-width: 900px) 100vw, 900px"
                  />

                  {/* Arrow buttons always visible on hover */}
                  <div
                    className={`absolute inset-0 flex items-center justify-between px-4 z-10 transition-opacity duration-300 ${
                      hovered === product.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <button
                      aria-label="Show previous image"
                      className="cursor-pointer rounded-full p-2 shadow transition"
                      onClick={e => {
                        e.stopPropagation();
                        handleArrow(product.id, 'left');
                      }}
                      tabIndex={-1}
                    >
                      <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M17 7l-6 7 6 7" />
                      </svg>
                    </button>
                    <button
                      aria-label="Show next image"
                      className="cursor-pointer rounded-full p-2 shadow transition"
                      onClick={e => {
                        e.stopPropagation();
                        handleArrow(product.id, 'right');
                      }}
                      tabIndex={-1}
                    >
                      <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M11 7l6 7-6 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center mt-2">
                  <span className="text-xs text-gray-700 font-medium">Product {product.id}</span>
                  <span className="text-xs text-gray-500">${product.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}