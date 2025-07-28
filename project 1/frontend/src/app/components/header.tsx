'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const menuItems = [
  {
    label: 'About',
    submenu: [
      { label: 'Example', href: '#' },
      { label: 'Example', href: '#' },
      { label: 'Example', href: '#' },
    ],
  },
  {
    label: 'Products',
    submenu: [
      { label: 'Example', href: '#' },
      { label: 'Example', href: '#' },
      { label: 'Example', href: '#' },
    ],
  },
  {
    label: 'Contact',
    submenu: [
      { label: 'Example', href: '#' },
      { label: 'Example', href: '#' },
    ],
  },
];

const rightButtons = [
  {
    label: 'Enter',
    onClick: () => alert('login'),
    style: 'outline',
  },
  {
    label: 'Sign up',
    onClick: () => alert('register'),
    style: 'solid',
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

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
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 100);
  };

  const handleMenuMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleSubMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 100);
  };

  const handleSubMenuMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState<{ [k: number]: boolean }>({});
  const handleMobileSubmenuToggle = (idx: number) => {
    setMobileOpenSubmenus(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <header
      ref={headerRef}
      className={classNames(
        'fixed top-4 left-[3%] w-[94%] z-40 transition-transform duration-300 rounded-full',
        hideHeader ? '-translate-y-[150%]' : 'translate-y-0',
        'bg-white'
      )}
      style={{}}
    >
      <div className="max-w-8xl mx-auto flex items-center h-15 px-4 md:px-8">
        <div className="font-bold text-1xl text-gray-900 mr-6 md:mr-14 select-none tracking-tight flex-shrink-0">
          Logo
        </div>
        <nav className="flex-1 flex justify-center ">
          <ul className="flex space-x-8 ">
            {menuItems.map((item, idx) => (
              <li
                key={item.label}
                className="relative text-1xl"
                onMouseEnter={() => handleMenuMouseEnter(idx)}
                onMouseLeave={handleMenuMouseLeave}
              >
                <button
                  className={classNames(
                    'flex items-center gap-1 py-0.5 text-1xl text-gray-800 hover:text-black transition-colors cursor-pointer',
                    openMenu === idx && 'text-black'
                  )}
                  type="button"
                  aria-haspopup={!!item.submenu}
                  aria-expanded={openMenu === idx}
                  onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
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
                    className="absolute left-0 top-full mt-2 z-30 bg-white border border-gray-200 rounded-md min-w-[180px] shadow-xl animate-fade"
                    onMouseEnter={handleSubMenuMouseEnter}
                    onMouseLeave={handleSubMenuMouseLeave}
                  >
                    <ul>
                      {item.submenu.map(subitem => (
                        <li key={subitem.label}>
                          <Link
                            href={subitem.href}
                            className="block px-5 py-2 text-gray-700 hover:bg-gray-100 hover:text-black text-sm transition-colors"
                            onClick={() => setOpenMenu(null)}
                          >
                            {subitem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex items-center space-x-4 ml-8">
          {rightButtons.map((btn, i) =>
            btn.style === 'solid' ? (
              <button
                key={i}
                onClick={() => (window.location.href = "/Login")}
                className="px-5 py-2 rounded bg-gray-900 text-white font-semibold shadow hover:bg-gray-700 transition cursor-pointer"
              >
                {btn.label}
              </button>
            ) : (
              <button
                key={i}
                onClick={() => (window.location.href = "/Login")}
                className="px-5 py-2 rounded border border-gray-900 text-gray-900 font-semibold hover:bg-gray-100 transition"
              >
                {btn.label}
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
