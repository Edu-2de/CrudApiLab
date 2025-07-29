"use client";
import { useRef, useState, useEffect } from "react";

const mockProducts = [
  { id: 1, img: "/product1.jpg", variation: "/product1Variation.jpg", price: 120 },
  { id: 2, img: "/product2.jpg", variation: "/product2Variation.jpg", price: 99 },
  { id: 3, img: "/product3.jpg", variation: "/product3Variation.jpg", price: 89 },
  { id: 4, img: "/product4.jpg", variation: "/product4Variation.jpg", price: 110 },
  { id: 5, img: "/product5.jpg", variation: "/product5Variation.jpg", price: 105 },
  { id: 6, img: "/product6.jpg", variation: "/product6Variation.jpg", price: 95 },
  { id: 7, img: "/product7.jpg", variation: "/product7Variation.jpg", price: 130 },
  { id: 8, img: "/product8.jpg", variation: "/product8Variation.jpg", price: 115 },
];

const visibleCountDesktop = 4;
const visibleCountTablet = 2;
const visibleCountMobile = 1;

function getVisibleCount(width: number) {
  if (width < 640) return visibleCountMobile;
  if (width < 1024) return visibleCountTablet;
  return visibleCountDesktop;
}

export default function HighlightsProductRow() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [visibleCount, setVisibleCount] = useState(getVisibleCount(windowWidth));
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setVisibleCount(getVisibleCount(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  const total = mockProducts.length;
  const extendedProducts = [
    ...mockProducts.slice(-visibleCount),
    ...mockProducts,
    ...mockProducts.slice(0, visibleCount),
  ];
  const realIndex = index + visibleCount;

  // Aumente o tamanho dos cards e imagens
  const cardWidth =
    windowWidth >= 1024
      ? 400
      : windowWidth >= 640
      ? 340
      : Math.max(windowWidth - 48, 220);
  const gap = windowWidth >= 1024 ? 48 : windowWidth >= 640 ? 32 : 16;
  const containerWidth = visibleCount * cardWidth + (visibleCount - 1) * gap;
  const slideWidth = cardWidth + gap;
  const translate = -realIndex * slideWidth;

  function handleNext() {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  }
  function handlePrev() {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  }
  function handleTransitionEnd() {
    setIsTransitioning(false);
    if (index < 0) {
      setIndex(total - visibleCount);
    } else if (index >= total) {
      setIndex(0);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  });

  return (
    <section className="relative py-8 bg-transparent select-none">
      <div className="max-w-[1800px] mx-auto px-2">
        <div className="flex flex-col items-center mb-6 w-full">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">Highlights</h2>
        </div>
        <div className="relative">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-0 m-0 bg-transparent border-none hover:scale-110 transition"
            onClick={handlePrev}
            aria-label="Previous"
            type="button"
            disabled={isTransitioning}
          >
            <svg width={32} height={32} fill="none" stroke="#222" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-0 m-0 bg-transparent border-none hover:scale-110 transition"
            onClick={handleNext}
            aria-label="Next"
            type="button"
            disabled={isTransitioning}
          >
            <svg width={32} height={32} fill="none" stroke="#222" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            className="overflow-hidden mx-auto"
            ref={listRef}
            style={{
              width: containerWidth,
              maxWidth: "100%",
              boxSizing: "content-box",
            }}
          >
            <div
              className={`
                flex gap-12
                ${isTransitioning ? "transition-transform duration-400 ease-in-out" : ""}
              `}
              style={{
                minHeight: windowWidth < 640 ? 280 : 420,
                willChange: "transform",
                transform: `translateX(${translate}px)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedProducts.map((product, idx) => (
                <div
                  key={product.id + "-" + idx}
                  className={`
                    group flex flex-col items-center justify-center
                    rounded-2xl bg-transparent shadow-none
                    transition-all duration-300
                    cursor-pointer
                    ${windowWidth >= 1024
                      ? "min-w-[400px] max-w-[400px]"
                      : windowWidth >= 640
                      ? "min-w-[340px] max-w-[340px]"
                      : "min-w-[calc(100vw-48px)] max-w-[calc(100vw-48px)]"}
                    w-full
                  `}
                  style={{
                    minHeight: windowWidth < 640 ? 280 : 420,
                    padding: windowWidth < 640
                      ? "1.2rem 0.7rem 1.1rem 0.7rem"
                      : "2.2rem 1.5rem 1.7rem 1.5rem",
                  }}
                  tabIndex={0}
                  aria-label="Product"
                  draggable={false}
                >
                  <div
                    className={`
                      relative w-full ${windowWidth < 640 ? "h-48" : "h-80"} rounded-xl mb-5
                      bg-transparent flex items-center justify-center
                    `}
                  >
                    {/* Imagem principal */}
                    <img
                      src={product.img}
                      alt={`Product ${product.id}`}
                      className="absolute inset-0 w-full h-full object-contain rounded-xl transition-all duration-500 group-hover:opacity-0 group-hover:invisible"
                    />
                    {/* Imagem de variação */}
                    <img
                      src={product.variation}
                      alt={`Product ${product.id} variation`}
                      className="absolute inset-0 w-full h-full object-contain rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500"
                    />
                  </div>
                  <div className="w-full text-center">
                    <div className={`font-semibold text-gray-900 ${windowWidth < 640 ? "text-base" : "text-lg"} mb-1`}>
                      Product {product.id}
                    </div>
                    <div className={`text-gray-700 font-normal ${windowWidth < 640 ? "text-sm" : "text-base"} mb-2`}>
                      Variation: Product {product.id} variation
                    </div>
                    <div className={`text-gray-900 font-bold ${windowWidth < 640 ? "text-base" : "text-lg"} mb-2`}>
                      ${product.price}
                    </div>
                    <button
                      className={`
                        mt-2 px-5 py-2 rounded-full font-semibold text-sm
                        bg-gray-900 text-white border border-gray-900
                        transition-all duration-200
                        hover:bg-gray-700
                        focus:outline-none focus:ring-2 focus:ring-gray-600
                      `}
                      tabIndex={-1}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}