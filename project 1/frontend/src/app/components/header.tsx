'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Menu principal com submenus
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
}
