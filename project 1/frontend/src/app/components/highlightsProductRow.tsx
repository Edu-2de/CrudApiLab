'use client';
import { useState, useEffect } from 'react';
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
  const [screenSize, setScreenSize] = useState('lg');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else if (width < 1280) setScreenSize('xl');
      else setScreenSize('2xl');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = (id: number) => {
    setHovered(id);
    setActiveImage(prev => ({ ...prev, [id]: 'variation' }));
  };

  const handleMouseLeave = (id: number) => {
    setHovered(null);
    setActiveImage(prev => ({ ...prev, [id]: 'main' }));
  };

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

  // Responsive configurations
  const getResponsiveConfig = () => {
    switch (screenSize) {
      case 'sm':
        return {
          cardWidth: 'w-[280px]',
          cardHeight: 'h-[400px]',
          imageHeight: 'h-[320px]',
          padding: 'p-3',
          gap: 'gap-2',
          titleSize: 'text-sm',
          priceSize: 'text-xs',
          arrowSize: 20,
          containerPadding: 'px-4',
          gridCols: 'grid-cols-1',
          overflow: 'overflow-x-auto'
        };
      case 'md':
        return {
          cardWidth: 'w-[320px]',
          cardHeight: 'h-[480px]',
          imageHeight: 'h-[380px]',
          padding: 'p-4',
          gap: 'gap-3',
          titleSize: 'text-base',
          priceSize: 'text-sm',
          arrowSize: 24,
          containerPadding: 'px-6',
          gridCols: 'grid-cols-2',
          overflow: 'overflow-x-auto'
        };
      case 'lg':
        return {
          cardWidth: 'w-[360px]',
          cardHeight: 'h-[520px]',
          imageHeight: 'h-[420px]',
          padding: 'p-4',
          gap: 'gap-4',
          titleSize: 'text-lg',
          priceSize: 'text-base',
          arrowSize: 28,
          containerPadding: 'px-8',
          gridCols: 'grid-cols-3',
          overflow: 'overflow-x-auto'
        };
      case 'xl':
        return {
          cardWidth: 'w-[400px]',
          cardHeight: 'h-[580px]',
          imageHeight: 'h-[480px]',
          padding: 'p-5',
          gap: 'gap-4',
          titleSize: 'text-lg',
          priceSize: 'text-base',
          arrowSize: 28,
          containerPadding: 'px-10',
          gridCols: 'grid-cols-4',
          overflow: 'overflow-visible'
        };
      default: // 2xl
        return {
          cardWidth: 'w-[460px]',
          cardHeight: 'h-[650px]',
          imageHeight: 'h-[550px]',
          padding: 'p-6',
          gap: 'gap-5',
          titleSize: 'text-xl',
          priceSize: 'text-lg',
          arrowSize: 32,
          containerPadding: 'px-12',
          gridCols: 'grid-cols-4',
          overflow: 'overflow-visible'
        };
    }
  };

  const config = getResponsiveConfig();

  return (
    <section className="relative py-4 md:py-8 bg-transparent select-none">
      <div className="max-w-[1800px] mx-auto">
        <h2 className={`${config.titleSize} text-gray-900 text-start mb-4 md:mb-6 font-semibold ${config.containerPadding}`}>
          Highlights
        </h2>
        
        <div className={`${config.overflow} ${config.containerPadding}`}>
          <div className={`flex ${config.gap} ${screenSize === 'sm' ? 'w-max' : 'justify-center'}`}>
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
                    ${config.cardWidth} ${config.cardHeight}
                    flex-shrink-0
                  `}
                  tabIndex={0}
                  aria-label="Product"
                  draggable={false}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={() => handleMouseLeave(product.id)}
                >
                  <div className={`relative w-full ${config.imageHeight} rounded-xl mb-3 bg-[#e6e4da] flex items-center justify-center overflow-hidden`}>
                    {/* Main image */}
                    <Image
                      src={product.img}
                      alt={`Product ${product.id}`}
                      fill
                      className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-all duration-500 ${
                        showVariation ? 'opacity-0 invisible' : 'opacity-100 visible'
                      }`}
                      draggable={false}
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, (max-width: 1280px) 400px, 460px"
                      priority={product.id <= 2}
                    />

                    {/* Variation image */}
                    <Image
                      src={product.variation}
                      alt={`Product ${product.id} variation`}
                      fill
                      className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-all duration-500 ${
                        showVariation ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      draggable={false}
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, (max-width: 1280px) 400px, 460px"
                    />

                    {/* Arrow buttons */}
                    <div
                      className={`absolute inset-0 flex items-center justify-between px-2 md:px-4 z-10 transition-opacity duration-300 ${
                        hovered === product.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <button
                        aria-label="Show previous image"
                        className="bg-white/80 hover:bg-white/90 rounded-full p-1 md:p-2 shadow-lg transition"
                        onClick={e => {
                          e.stopPropagation();
                          handleArrow(product.id, 'left');
                        }}
                        tabIndex={-1}
                      >
                        <svg width={config.arrowSize} height={config.arrowSize} fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M17 7l-6 7 6 7" />
                        </svg>
                      </button>
                      <button
                        aria-label="Show next image"
                        className="bg-white/80 hover:bg-white/90 rounded-full p-1 md:p-2 shadow-lg transition"
                        onClick={e => {
                          e.stopPropagation();
                          handleArrow(product.id, 'right');
                        }}
                        tabIndex={-1}
                      >
                        <svg width={config.arrowSize} height={config.arrowSize} fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M11 7l6 7-6 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Product info */}
                  <div className="w-full flex flex-col items-center mt-2">
                    <span className={`${config.titleSize} text-gray-700 font-medium mb-1`}>
                      Product {product.id}
                    </span>
                    <span className={`${config.priceSize} text-gray-500`}>
                      ${product.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1023px) {
          .overflow-x-auto {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}