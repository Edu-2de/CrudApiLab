'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { FiUser } from 'react-icons/fi';

const menuItems = [
  {
    label: 'About',
    submenu: [
      { label: 'Our Story', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Stores', href: '#' },
    ],
  },
  {
    label: 'Products',
    submenu: [
      { label: 'Shoes', href: '#' },
      { label: 'Accessories', href: '#' },
      { label: 'Collections', href: '#' },
      { label: 'Gift Cards', href: '#' },
      { label: 'Sale', href: '#' },
      { label: 'Kids', href: '#' },
      { label: 'Limited Edition', href: '#' },
      { label: 'Custom', href: '#' },
    ],
  },
  {
    label: 'Support',
    submenu: [
      { label: 'Contact Us', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Order Tracking', href: '#' },
      { label: 'Warranty', href: '#' },
      { label: 'Size Guide', href: '#' },
      { label: 'Live Chat', href: '#' },
    ],
  },
  {
    label: 'Account',
    submenu: [
      { label: 'Login', href: '/Login' },
      { label: 'Register', href: '#' },
      { label: 'Profile', href: '#' },
      { label: 'Orders', href: '#' },
      { label: 'Wishlist', href: '#' },
      { label: 'Settings', href: '#' },
    ],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [solid, setSolid] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [submenuHover, setSubmenuHover] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      lastScrollY.current = currentScrollY;
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mantém submenu aberto enquanto mouse está no header ou submenu
  const handleMenuMouseEnter = (idx: number) => {
    setOpenMenu(idx);
  };
  const handleMenuMouseLeave = () => {
    setTimeout(() => {
      if (!submenuHover) setOpenMenu(null);
    }, 80);
  };
  const handleSubmenuMouseEnter = () => setSubmenuHover(true);
  const handleSubmenuMouseLeave = () => {
    setSubmenuHover(false);
    setOpenMenu(null);
  };

  return (
    <header
      ref={headerRef}
      className={classNames(
        'fixed top-0 w-full z-40 transition-transform duration-300 bg-transparent',
        solid
          ? "bg-white/80 backdrop-blur-md shadow border-b border-gray-200"
          : "bg-transparent",
        hideHeader ? '-translate-y-[150%]' : 'translate-y-0',
      )}
      onMouseLeave={handleMenuMouseLeave}
      onMouseEnter={() => {}}
    >
      <div className="max-w-[90%] mx-auto flex items-center h-14 px-4 md:px-8 justify-around">
        <div className="font-bold text-1xl text-gray-900 mr-6 md:mr-14 select-none tracking-tight flex-shrink-0">
          Logo
        </div>
        <nav className="flex-1 flex justify-center relative">
          <ul className="flex space-x-8">
            {menuItems.map((item, idx) => (
              <li
                key={item.label}
                className="relative text-1xl"
                onMouseEnter={() => handleMenuMouseEnter(idx)}
                onMouseLeave={handleMenuMouseLeave}
              >
                <button
                  className={classNames(
                    'flex items-center gap-1 py-4 text-1xl text-gray-800 hover:text-black transition-colors cursor-pointer bg-transparent font-semibold',
                    openMenu === idx && 'text-black'
                  )}
                  type="button"
                  aria-haspopup={!!item.submenu}
                  aria-expanded={openMenu === idx}
                  tabIndex={0}
                  style={{ background: 'none', border: 'none' }}
                >
                  {item.label}
                  {item.submenu && (
                    <svg
                      className={classNames(
                        'ml-1 w-4 h-4 text-gray-500 transform transition-transform duration-200',
                        openMenu === idx ? '-rotate-180 -translate-y-0.5' : 'rotate-0'
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                {item.submenu && openMenu === idx && (
                  <div
                    className="fixed left-0 top-14 w-full z-50 bg-white/95 border-t border-gray-200 shadow-xl animate-fade"
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                  >
                    <div className="max-w-8xl mx-auto px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                      {item.submenu.map(subitem => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-6 py-4 text-gray-700 hover:bg-gray-100 hover:text-black text-base rounded transition-colors font-medium text-center"
                          onClick={() => setOpenMenu(null)}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4 ml-8 text-black">
          <FiUser
            onClick={() => (window.location.href = '/Login')}
            className="w-full z-50 text-4xl px-5 py-2 text-gray-900 hover:text-gray-500 transition cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}