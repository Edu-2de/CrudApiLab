"use client";
import { useState } from "react";
import Image from "next/image";

const mockProducts = [
  { id: 1, img: "/product1.jpg", variation: "/product1Variation.jpg", price: 120 },
  { id: 2, img: "/product2.jpg", variation: "/product2Variation.jpg", price: 99 },
  { id: 3, img: "/product3.jpg", variation: "/product3Variation.jpg", price: 89 },
  { id: 4, img: "/product4.jpg", variation: "/product4Variation.jpg", price: 110 },
];

export default function HighlightsProductRow() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<{ [key: number]: "main" | "variation" }>({});

 
  const handleMouseEnter = (id: number) => {
    setHovered(id);
    setActiveImage(prev => ({ ...prev, [id]: "variation" }));
  };
  const handleMouseLeave = (id: number) => {
    setHovered(null);
    setActiveImage(prev => ({ ...prev, [id]: "main" }));
  };


  const handleArrow = (id: number, type: "main" | "variation") => {
    setActiveImage(prev => ({ ...prev, [id]: type }));
  };

  return (
    <section className="relative py-8 bg-white select-none  ">
      <div className="max-w-[1800px] mx-auto px-2 ">
        <div className="flex w-full justify-center items-stretch ">
          {mockProducts.map((product) => {
            const showVariation = activeImage[product.id] === "variation";
            return (
              <>
                <div
                  key={product.id}
                  className={`
                    group flex flex-col items-center justify-center
                    rounded-2xl bg-transparent shadow-none
                    transition-all duration-300
                    cursor-pointer
                    min-w-[400px] max-w-[400px] w-full
                  `}
                  style={{
                    minHeight: 420,
                    padding: "2.2rem 1.5rem 1.7rem 1.5rem",
                  }}
                  tabIndex={0}
                  aria-label="Product"
                  draggable={false}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={() => handleMouseLeave(product.id)}
                >
                  <div
                    className={`
                      relative w-full h-80 rounded-xl mb-5
                      bg-transparent flex items-center justify-center
                    `}
                  >
                    <Image
                      src={product.img}
                      alt={`Product ${product.id}`}
                      fill
                      className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-all duration-500 ${showVariation ? "opacity-0 invisible" : "opacity-100 visible"}`}
                      draggable={false}
                      sizes="(max-width: 400px) 100vw, 400px"
                    />

                    <Image
                      src={product.variation}
                      alt={`Product ${product.id} variation`}
                      fill
                      className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-all duration-500 ${showVariation ? "opacity-100 visible" : "opacity-0 invisible"}`}
                      draggable={false}
                      sizes="(max-width: 400px) 100vw, 400px"
                    />
                    {hovered === product.id && (
                      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                        <button
                          className="bg-white/80 hover:bg-white rounded-full p-2 shadow transition"
                          onClick={() => handleArrow(product.id, "main")}
                          tabIndex={-1}
                          aria-label="Principal Image"
                          style={{ opacity: showVariation ? 1 : 0, pointerEvents: showVariation ? "auto" : "none" }}
                        >
                          <svg width={24} height={24} fill="none" stroke="#222" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                       
                        <button
                          className="bg-white/80 hover:bg-white rounded-full p-2 shadow transition"
                          onClick={() => handleArrow(product.id, "variation")}
                          tabIndex={-1}
                          aria-label="Variation"
                          style={{ opacity: !showVariation ? 1 : 0, pointerEvents: !showVariation ? "auto" : "none" }}
                        >
                          <svg width={24} height={24} fill="none" stroke="#222" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-full text-center">
                    <div className="font-semibold text-gray-900 text-lg mb-1">
                      Product {product.id}
                    </div>
                    <div className="text-gray-700 font-normal text-base mb-2">
                      Variation: Product {product.id} variation
                    </div>
                    <div className="text-gray-900 font-bold text-lg mb-2">
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
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}