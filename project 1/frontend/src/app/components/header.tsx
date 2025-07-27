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

const rightButton = [
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

  const headerRef = useRef<HTMLDivElement>(null);

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

  const handleMenuMouseEnter = () => {
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
        'fixed top-0 left-0 w-full z-40 transition-all duration-300',
        solid ? 'bg-white/80 backdrop-blur-md shadow border-b border-gray-200' : 'bg-transparent'
      )}
      style={{ backdropFilter: solid ? 'blur(8px)' : undefined }}
    >
      <div className="max-w-7xl mx-auto flex items-center h-20 px-4 md:px-8">
        <div className="font-bold text-2xl text-gray-900 mr-6 md:mr-14 select-none tracking-tight flex-shrink-0">
          Logo
        </div>
        <nav className="flex-1 hidden md:block">
          <ul className="flex space-x-8"></ul>
        </nav>
      </div>
    </header>
  );
}
