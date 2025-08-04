'use client';
import { useState } from 'react';
import Image from 'next/image';

const shoes = [
  {
    name: 'Lounger Lift',
    subtitle: 'Taupe Blush (Natural White Sole)',
    price: '$105',
    img: '/shoe1.png',
    imgHover: '/shoe1Variation.png',
    shopMen: true,
    shopWomen: true,
  },
  {
    name: 'Runner Classic',
    subtitle: 'Cream Knit (Natural Sole)',
    price: '$120',
    img: '/shoe2.png',
    imgHover: '/shoe2Variation.png',
    shopMen: true,
    shopWomen: false,
  },
  {
    name: 'Urban Black',
    subtitle: 'Black (White Sole)',
    price: '$110',
    img: '/shoe3.png',
    imgHover: '/shoe3Variation.png',
    shopMen: false,
    shopWomen: true,
  },
];

const tabs = [
  { label: 'NEW ARRIVALS' },
  { label: 'BESTSELLERS' },
  { label: 'SUMMER SHOES' },
];

export default function ShoesRow() {
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState(false);
  const [tab, setTab] = useState(0);

  // Cursor SVG (arrow right)
  const cursorSvg = encodeURIComponent(`
    <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.6)" stroke="#222"/>
      <path d="M20 16l8 8-8 8" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const cursorStyle = hover
    ? {
        cursor: `url("data:image/svg+xml,${cursorSvg}") 36 24, pointer`,
        transition: 'cursor 0.2s',
      }
    : {};

  const shoe = shoes[current];

  return (
    <section className="w-full flex flex-col items-center py-12 select-none mt-10">
      {/* Tabs */}
      <div className="flex gap-10 mb-12 mt-2">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            className={`uppercase tracking-widest text-lg md:text-xl px-2 pb-1 border-b-2 transition font-medium ${
              tab === i
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
            onClick={() => setTab(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
 
      <div className="relative flex items-center justify-center w-full max-w-5xl min-h-[420px] md:min-h-[520px]">
       
        {current > 0 && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-[60%] flex items-center justify-end pointer-events-none opacity-60">
            <Image
              src={shoes[current - 1].img}
              alt={shoes[current - 1].name}
              width={400}
              height={300}
              className="object-contain"
              draggable={false}
            />
          </div>
        )}
   
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[90%] h-[80%] flex items-center justify-center pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(rgba(0,0,0,0.10) 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
              borderRadius: '40px',
            }}
          />
        </div>

        <div
          className="relative z-10 flex flex-col items-center justify-center w-[60vw] max-w-[700px] min-h-[320px] md:min-h-[420px] transition-all duration-300"
          style={cursorStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setCurrent((prev) => (prev + 1) % shoes.length)}
        >
          <Image
            src={hover && shoe.imgHover ? shoe.imgHover : shoe.img}
            alt={shoe.name}
            width={700}
            height={350}
            className={`object-contain transition-all duration-500`}
            draggable={false}
            priority
          />
        </div>
   
        {current < shoes.length - 1 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30%] h-[60%] flex items-center justify-start pointer-events-none opacity-60">
            <Image
              src={shoes[current + 1].img}
              alt={shoes[current + 1].name}
              width={400}
              height={300}
              className="object-contain"
              draggable={false}
            />
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-2">{shoe.name}</h2>
        <div className="text-gray-700 text-base md:text-lg mb-1">{shoe.subtitle}</div>
        <div className="text-gray-900 text-lg md:text-xl font-semibold mb-6">{shoe.price}</div>
        <div className="flex justify-center gap-4">
          {shoe.shopMen && (
            <button className="px-6 py-2 rounded-full border border-gray-900 bg-transparent text-gray-900 font-semibold text-base hover:bg-gray-100 transition">
              Shop Men
            </button>
          )}
          {shoe.shopWomen && (
            <button className="px-6 py-2 rounded-full border border-gray-900 bg-transparent text-gray-900 font-semibold text-base hover:bg-gray-100 transition">
              Shop Women
            </button>
          )}
        </div>
      </div>
    </section>
  );
}