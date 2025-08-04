import Image from 'next/image';
import { useRef, useState } from 'react';
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

  const CARD_WIDTH = 600;
  const CARD_HEIGHT = 700;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -CARD_WIDTH : CARD_WIDTH,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full relative">
      {/* Left Arrow */}
      <button
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 bg-transparent hover:bg-white/20 rounded-full p-1 shadow transition"
        style={{ pointerEvents: 'auto' }}
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <FiChevronLeft size={20} className="text-white drop-shadow" />
      </button>
      {/* Right Arrow */}
      <button
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-transparent hover:bg-white/20 rounded-full p-1 shadow transition"
        style={{ pointerEvents: 'auto' }}
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <FiChevronRight size={20} className="text-white drop-shadow" />
      </button>
      <div
        ref={scrollRef}
        className="flex w-full min-h-[700px] gap-0 overflow-x-auto scrollbar-hide"
        style={{
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categories.map((cat, idx) => {
          let imgSrc = cat.img;
          if (hoverGender[idx] === 'men' && cat.men) imgSrc = cat.men;
          if (hoverGender[idx] === 'women' && cat.women) imgSrc = cat.women;

          return (
            <div
              key={cat.label}
              className={`relative flex-shrink-0 w-[${CARD_WIDTH}px] h-[${CARD_HEIGHT}px] group cursor-pointer`}
              style={{
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                zIndex: 1,
                marginRight: idx !== categories.length - 1 ? '8px' : '0',
                background: '#111',
                overflow: 'hidden',
              }}
              onMouseLeave={() => setHoverGender(prev => ({ ...prev, [idx]: null }))}
            >
              <Image
                src={imgSrc}
                alt={cat.label}
                fill
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
                style={{}}
                sizes="(max-width: 900px) 100vw, 600px"
                priority={idx === 0}
              />
             
              <div className="absolute inset-0 pointer-events-none rounded transition-all duration-300 group-hover:bg-black/30" />
              
              <div className="absolute bottom-8 left-8 z-20">
                <div className="text-white text-xl md:text-2xl font-bold drop-shadow-lg flex flex-col gap-2">
                  <span className="text-white">{cat.label}</span>
                  {cat.hasGender && (
                    <div className="hidden group-hover:flex gap-2 mt-2">
                      <button
                        className="bg-white/20 hover:bg-white/40 text-white text-xs px-3 py-1 rounded-full font-medium transition"
                        onMouseEnter={() => setHoverGender(prev => ({ ...prev, [idx]: 'men' }))}
                        onMouseLeave={() => setHoverGender(prev => ({ ...prev, [idx]: null }))}
                      >
                        Men
                      </button>
                      <button
                        className="bg-white/20 hover:bg-white/40 text-white text-xs px-3 py-1 rounded-full font-medium transition"
                        onMouseEnter={() => setHoverGender(prev => ({ ...prev, [idx]: 'women' }))}
                        onMouseLeave={() => setHoverGender(prev => ({ ...prev, [idx]: null }))}
                      >
                        Women
                      </button>
                    </div>
                  )}
                </div>
              </div>
          
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none rounded" />
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
