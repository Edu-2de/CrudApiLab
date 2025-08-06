'use client';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  {
    label: 'New in',
    img: '/newIn.jpg',
    men: '/newIn.jpg',
    women: '/newInWoman.jpg',
    hasGender: true,
  },
  {
    label: 'Hoodies',
    img: '/hoodies.jpg',
    men: '/hoodiesMen.jpg',
    women: '/hoodies.jpg',
    hasGender: true,
  },
  {
    label: 'T-shirts & Tops',
    img: '/t-shirt.jpg',
    men: '/t-shirt.jpg',
    women: '/t-shirtWomen.jpg',
    hasGender: true,
  },
  {
    label: 'Sweatshirts',
    img: '/sweatshirt.jpg',
    men: '/sweatshirtMen.jpg',
    women: '/sweatshirt.jpg',
    hasGender: true,
  },
];

export default function TopPartsRow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoverGender, setHoverGender] = useState<{ [key: number]: 'men' | 'women' | null }>({});
  const [screenSize, setScreenSize] = useState('lg');

  // Responsive dimensions
  const getCardDimensions = () => {
    if (typeof window === 'undefined') return { width: 600, height: 700 };
    
    const width = window.innerWidth;
    if (width < 640) return { width: 280, height: 350 }; // sm
    if (width < 768) return { width: 320, height: 400 }; // md
    if (width < 1024) return { width: 400, height: 500 }; // lg
    if (width < 1280) return { width: 500, height: 600 }; // xl
    return { width: 600, height: 700 }; // 2xl
  };

  const [cardDimensions, setCardDimensions] = useState(getCardDimensions());

  useEffect(() => {
    const handleResize = () => {
      setCardDimensions(getCardDimensions());
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = screenSize === 'sm' ? cardDimensions.width : cardDimensions.width + 8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full relative mt-6 md:mt-10">
      {/* Left Arrow */}
      <button
        className="cursor-pointer absolute left-1 md:left-2 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-1 md:p-2 shadow-lg transition"
        style={{ pointerEvents: 'auto' }}
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <FiChevronLeft size={screenSize === 'sm' ? 20 : 25} className="text-gray-900" />
      </button>
      
      {/* Right Arrow */}
      <button
        className="cursor-pointer absolute right-1 md:right-2 top-1/2 z-20 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-1 md:p-2 shadow-lg transition"
        style={{ pointerEvents: 'auto' }}
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <FiChevronRight size={screenSize === 'sm' ? 20 : 25} className="text-gray-900" />
      </button>

      <div
        ref={scrollRef}
        className="flex w-full gap-2 md:gap-2 overflow-x-auto scrollbar-hide px-4 md:px-6"
        style={{
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          minHeight: `${cardDimensions.height}px`,
        }}
      >
        {categories.map((cat, idx) => {
          let imgSrc = cat.img;
          if (hoverGender[idx] === 'men' && cat.men) imgSrc = cat.men;
          if (hoverGender[idx] === 'women' && cat.women) imgSrc = cat.women;

          return (
            <div
              key={cat.label}
              className="relative flex-shrink-0 group cursor-pointer rounded-lg md:rounded-xl overflow-hidden bg-gray-900"
              style={{
                width: `${cardDimensions.width}px`,
                height: `${cardDimensions.height}px`,
                minWidth: `${cardDimensions.width}px`,
              }}
              onMouseLeave={() => setHoverGender(prev => ({ ...prev, [idx]: null }))}
            >
              <Image
                src={imgSrc}
                alt={cat.label}
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, (max-width: 1280px) 500px, 600px"
                priority={idx === 0}
              />
             
              {/* Hover overlay */}
              <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/30" />
              
              {/* Content */}
              <div className={`absolute ${screenSize === 'sm' ? 'bottom-4 left-4' : 'bottom-6 left-6 md:bottom-8 md:left-8'} z-10`}>
                <div className={`text-white font-bold drop-shadow-lg flex flex-col gap-1 md:gap-2 ${
                  screenSize === 'sm' ? 'text-lg' : screenSize === 'md' ? 'text-xl' : 'text-xl md:text-2xl'
                }`}>
                  <span className="text-white leading-tight">{cat.label}</span>
                  {cat.hasGender && (
                    <div className={`hidden group-hover:flex gap-1 md:gap-2 ${screenSize === 'sm' ? 'mt-1' : 'mt-2'}`}>
                      <button
                        className={`bg-white/20 hover:bg-white/40 text-white font-medium transition rounded-full ${
                          screenSize === 'sm' 
                            ? 'text-xs px-2 py-1' 
                            : 'text-xs md:text-sm px-3 py-1 md:px-4 md:py-2'
                        }`}
                        onMouseEnter={() => setHoverGender(prev => ({ ...prev, [idx]: 'men' }))}
                        onMouseLeave={() => setHoverGender(prev => ({ ...prev, [idx]: null }))}
                      >
                        Men
                      </button>
                      <button
                        className={`bg-white/20 hover:bg-white/40 text-white font-medium transition rounded-full ${
                          screenSize === 'sm' 
                            ? 'text-xs px-2 py-1' 
                            : 'text-xs md:text-sm px-3 py-1 md:px-4 md:py-2'
                        }`}
                        onMouseEnter={() => setHoverGender(prev => ({ ...prev, [idx]: 'women' }))}
                        onMouseLeave={() => setHoverGender(prev => ({ ...prev, [idx]: null }))}
                      >
                        Women
                      </button>
                    </div>
                  )}
                </div>
              </div>
          
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}