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
      if (width < 480) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
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

  // Responsive configurations - Otimizado para telas pequenas, mantendo grandes em desktop
  const getResponsiveConfig = () => {
    switch (screenSize) {
      case 'xs': // < 480px (mobile muito pequeno)
        return {
          cardWidth: 'w-[160px]',
          cardHeight: 'h-[240px]',
          imageHeight: 'h-[140px]',
          gap: 'gap-1',
          titleSize: 'text-xs',
          priceSize: 'text-xs',
          arrowSize: 16,
          containerPadding: 'px-2',
          layout: 'grid grid-cols-2',
          spacing: 'space-y-3'
        };
      case 'sm': // 480px - 640px (mobile)
        return {
          cardWidth: 'w-[180px]',
          cardHeight: 'h-[280px]',
          imageHeight: 'h-[180px]',
          gap: 'gap-2',
          titleSize: 'text-sm',
          priceSize: 'text-xs',
          arrowSize: 18,
          containerPadding: 'px-3',
          layout: 'grid grid-cols-2',
          spacing: 'space-y-4'
        };
      case 'md': // 640px - 768px (tablet pequeno)
        return {
          cardWidth: 'w-[200px]',
          cardHeight: 'h-[320px]',
          imageHeight: 'h-[220px]',
          gap: 'gap-3',
          titleSize: 'text-sm',
          priceSize: 'text-sm',
          arrowSize: 20,
          containerPadding: 'px-4',
          layout: 'grid grid-cols-2',
          spacing: 'space-y-4'
        };
      case 'lg': // 768px - 1024px (tablet/desktop pequeno) - MANTÉM GRANDES
        return {
          cardWidth: 'w-[320px]',
          cardHeight: 'h-[480px]',
          imageHeight: 'h-[380px]',
          gap: 'gap-3',
          titleSize: 'text-lg',
          priceSize: 'text-base',
          arrowSize: 24,
          containerPadding: 'px-6',
          layout: 'grid grid-cols-4',
          spacing: 'space-y-0'
        };
      case 'xl': // 1024px - 1280px (desktop) - MANTÉM GRANDES
        return {
          cardWidth: 'w-[350px]',
          cardHeight: 'h-[520px]',
          imageHeight: 'h-[420px]',
          gap: 'gap-4',
          titleSize: 'text-xl',
          priceSize: 'text-lg',
          arrowSize: 26,
          containerPadding: 'px-8',
          layout: 'grid grid-cols-4',
          spacing: 'space-y-0'
        };
      default: // 2xl (desktop grande) - MANTÉM GRANDES E PRÓXIMOS
        return {
          cardWidth: 'w-[380px]',
          cardHeight: 'h-[580px]',
          imageHeight: 'h-[480px]',
          gap: 'gap-4',
          titleSize: 'text-2xl',
          priceSize: 'text-xl',
          arrowSize: 28,
          containerPadding: 'px-12',
          layout: 'grid grid-cols-4',
          spacing: 'space-y-0'
        };
    }
  };

  const config = getResponsiveConfig();

  return (
    <section className="relative py-4 md:py-8 bg-transparent select-none">
      <div className="max-w-[1900px] mx-auto">
        <h2 className={`${config.titleSize} text-gray-900 text-start mb-4 md:mb-6 font-semibold ${config.containerPadding}`}>
          Highlights
        </h2>
        
        <div className={`${config.containerPadding}`}>
          <div className={`${config.layout} ${config.gap} ${config.spacing} justify-items-center`}>
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
                    hover:scale-105
                  `}
                  tabIndex={0}
                  aria-label={`Product ${product.id}`}
                  draggable={false}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={() => handleMouseLeave(product.id)}
                >
                  <div className={`relative w-full ${config.imageHeight} rounded-xl mb-2 bg-[#e6e4da] flex items-center justify-center overflow-hidden`}>
                    {/* Main image */}
                    <Image
                      src={product.img}
                      alt={`Product ${product.id}`}
                      fill
                      className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-all duration-500 ${
                        showVariation ? 'opacity-0 invisible' : 'opacity-100 visible'
                      }`}
                      draggable={false}
                      sizes="(max-width: 480px) 160px, (max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 320px, (max-width: 1280px) 350px, 380px"
                      priority={product.id <= 2}
                    />

                    {/* Variation image */}
                    <Image
                      src={product.variation}
                      alt={`Product ${product.id} variation`}
                      fill
                      className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-all duration-500 ${
                        showVariation ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      draggable={false}
                      sizes="(max-width: 480px) 160px, (max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 320px, (max-width: 1280px) 350px, 380px"
                    />

                    {/* Arrow buttons - só aparecem em telas maiores que mobile */}
                    {screenSize !== 'xs' && screenSize !== 'sm' && (
                      <div
                        className={`absolute inset-0 flex items-center justify-between px-3 z-10 transition-opacity duration-300 ${
                          hovered === product.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <button
                          aria-label="Show previous image"
                          className="bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg transition"
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
                          className="bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg transition"
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
                    )}

                    {/* Touch indicator para mobile */}
                    {(screenSize === 'xs' || screenSize === 'sm') && (
                      <div
                        className="absolute bottom-2 right-2 bg-white/80 rounded-full px-2 py-1 text-xs text-gray-600 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        onClick={e => {
                          e.stopPropagation();
                          handleArrow(product.id, 'right');
                        }}
                      >
                        Tap
                      </div>
                    )}
                  </div>
                  
                  {/* Product info */}
                  <div className="w-full flex flex-col items-center">
                    <span className={`${config.titleSize} text-gray-700 font-medium mb-1 text-center leading-tight`}>
                      Product {product.id}
                    </span>
                    <span className={`${config.priceSize} text-gray-500 font-semibold`}>
                      ${product.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile touch interaction */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .group:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </section>
  );
}