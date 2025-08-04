'use client'
import { FaTruck, FaShieldAlt, FaClock } from "react-icons/fa";

export default function InformationCards() {
  return (
    <section className="w-full pt-6 select-none">
      <div className="w-[90%] mx-auto flex items-center justify-center gap-8">
        <div className="flex items-center gap-3">
          <FaTruck className="text-gray-900 text-xl" />
          <span className="text-gray-900 font-medium text-base">Nationwide Delivery</span>
        </div>
        <div className="flex items-center gap-3">
          <FaShieldAlt className="text-gray-900 text-xl" />
          <span className="text-gray-900 font-medium text-base">Secure Payment</span>
        </div>
        <div className="flex items-center gap-3">
          <FaClock className="text-gray-900 text-xl" />
          <span className="text-gray-900 font-medium text-base">Fast Dispatch</span>
        </div>
      </div>
    </section>
  );
}