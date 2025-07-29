"use client";
import { useRef, useState, useEffect, useCallback } from "react";

const mockProducts = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

const visibleCountDesktop = 4;
const visibleCountTablet = 2;
const visibleCountMobile = 1;
const transitionTime = 400; 

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
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const total = mockProducts.length;
  const extendedProducts = [
    ...mockProducts.slice(-visibleCount),
    ...mockProducts,
    ...mockProducts.slice(0, visibleCount),
  ];
  const realIndex = index + visibleCount;

  const cardWidth =
    windowWidth >= 1024
      ? 288
      : windowWidth >= 640
      ? 320
      : windowWidth - 48;
  const gap = windowWidth >= 1024 ? 32 : windowWidth >= 640 ? 32 : 16;
  const slideWidth = cardWidth + gap;
  const containerWidth = visibleCount * cardWidth + (visibleCount - 1) * gap;
  const translate =
    -realIndex * slideWidth +
    (isDragging && dragStartX !== null ? dragDelta : 0);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  }, [isTransitioning]);

  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      handleNext();
    }, 4000);
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [handleNext]);

  function handleTransitionEnd() {
    setIsTransitioning(false);
    if (index < 0) {
      setIndex(total - visibleCount);
    } else if (index >= total) {
      setIndex(0);
    }
  }

  function handlePrev() {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (isTransitioning) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging || dragStartX === null) return;
    setDragDelta(e.clientX - dragStartX);
  }
  function handlePointerUp(e: React.PointerEvent) {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragDelta) > 60) {
      if (dragDelta < 0) handleNext();
      else handlePrev();
    } else {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), transitionTime);
    }
    setDragStartX(null);
    setDragDelta(0);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-white select-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-left">
            Highlights
          </h2>
          <div className="flex-1 border-b-2 border-gray-900 ml-4 sm:ml-6 rounded-full" />
        </div>
        <div className="relative">
          {/* Carousel Controls */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-blue-50 border border-blue-200 shadow px-2.5 py-2.5 rounded-full transition"
            onClick={handlePrev}
            aria-label="Anterior"
            type="button"
            disabled={isTransitioning}
          >
            <svg width={24} height={24} fill="none" stroke="#101828" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-blue-50 border border-blue-200 shadow px-2.5 py-2.5 rounded-full transition"
            onClick={handleNext}
            aria-label="Next"
            type="button"
            disabled={isTransitioning}
          >
            <svg width={24} height={24} fill="none" stroke="#404754" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {/* Carousel */}
          <div
            className="overflow-hidden mx-auto"
            ref={listRef}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              width: containerWidth,
              maxWidth: "100%",
              boxSizing: "content-box",
            }}
          >
            <div
              className={`
                flex
                ${windowWidth >= 640 ? "gap-8" : "gap-4"}
                ${isTransitioning ? "transition-transform duration-400 ease-in-out" : ""}
                ${isDragging ? "select-none pointer-events-none" : ""}
              `}
              style={{
                minHeight: windowWidth < 640 ? 260 : 340,
                willChange: "transform",
                transform: `translateX(${translate}px)`,
              }}
              onTransitionEnd={handleTransitionEnd}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={isDragging ? handlePointerUp : undefined}
            >
              {extendedProducts.map((product, idx) => (
                <div
                  key={product.id + "-" + idx}
                  className={`
                    group relative flex flex-col items-center justify-between
                    rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_0_rgba(100,116,139,0.08)]
                    transition-all duration-300
                    cursor-pointer
                    ${windowWidth >= 1024
                      ? "min-w-[288px] max-w-[288px]"
                      : windowWidth >= 640
                      ? "min-w-[320px] max-w-[320px]"
                      : "min-w-[calc(100vw-48px)] max-w-[calc(100vw-48px)]"}
                    w-full
                    ${hovered === product.id ? "scale-[1.035] shadow-md bg-gray-50 z-[60]" : ""}
                    ${selected === product.id ? "ring-2 ring-gray-800" : ""}
                  `}
                  style={{
                    minHeight: windowWidth < 640 ? 220 : 340,
                    padding: windowWidth < 640
                      ? "1.2rem 0.7rem 1.1rem 0.7rem"
                      : "2.2rem 1.5rem 1.7rem 1.5rem",
                  }}
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(product.id === selected ? null : product.id)}
                  tabIndex={0}
                  aria-label="Product"
                  draggable={false}
                >
                  <div
                    className={`
                      w-full ${windowWidth < 640 ? "h-24" : "h-36"} rounded-xl mb-5 md:mb-7 
                      bg-gray-50 border border-gray-200
                      flex items-center justify-center
                      transition-all duration-300
                      ${hovered === product.id ? "shadow" : ""}
                    `}
                  >
                    <div className={`${windowWidth < 640 ? "w-12 h-12" : "w-20 h-20"} bg-gray-200 rounded-lg`} />
                  </div>
                  <div className="w-full text-center">
                    <div className={`font-semibold text-gray-900 ${windowWidth < 640 ? "text-base" : "text-lg"} mb-1`}>
                      Product {product.id}
                    </div>
                    <div className={`text-gray-700 font-medium ${windowWidth < 640 ? "text-sm" : "text-base"} mb-2`}>
                      R$ --
                    </div>
                    <button
                      className={`
                        mt-2 px-5 py-2 rounded-full font-semibold text-sm
                        bg-gray-900 text-gray-800 border border-gray-900
                        transition-all duration-200
                        group-hover:bg-gray-600 group-hover:text-gray-700
                        focus:outline-none focus:ring-2 focus:ring-gray-600
                        shadow-sm
                      `}
                      tabIndex={-1}
                    >
                      View
                    </button>
                  </div>
                  {/* Badge de novo */}
                  <span className="absolute top-4 left-4  bg-gray-900 text-gray-800 text-xs font-bold px-3 py-1 rounded-full select-none border border-gray-900 shadow-sm">
                    New
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}