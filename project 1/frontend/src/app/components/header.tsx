'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';

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
  const [submenuHover, setSubmenuHover] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('lg');

  const headerRef = useRef<HTMLDivElement>(null);

  const HEADER_HEIGHT = 56; // 14 * 4 (h-14) = 56px
  const BANNER_HEIGHT = 32;

  const [user, setUser] = useState<{ first_name: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else if (width < 1280) setScreenSize('xl');
      else setScreenSize('2xl');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    localStorage.getItem('auth-token');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Show banner only at the top of the page
  useEffect(() => {
    function onScroll() {
      setShowBanner(window.scrollY < 10);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMenuMouseEnter = (idx: number) => {
    if (screenSize !== 'xs' && screenSize !== 'sm' && screenSize !== 'md') {
      setOpenMenu(idx);
    }
  };

  const handleMenuMouseLeave = () => {
    if (screenSize !== 'xs' && screenSize !== 'sm' && screenSize !== 'md') {
      setTimeout(() => {
        if (!submenuHover) setOpenMenu(null);
      }, 80);
    }
  };

  const handleSubmenuMouseEnter = () => setSubmenuHover(true);
  const handleSubmenuMouseLeave = () => {
    setSubmenuHover(false);
    setOpenMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
    setUser(null);
    setShowDropdown(false);
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMenu(null);
  };

  const handleMobileSubmenu = (idx: number) => {
    setOpenMenu(openMenu === idx ? null : idx);
  };

  // Responsive configurations
  const getResponsiveConfig = () => {
    switch (screenSize) {
      case 'xs':
        return {
          showFullMenu: false,
          logoSize: 'text-lg',
          containerPadding: 'px-3',
          containerMaxWidth: 'max-w-full',
          userIconSize: 'text-2xl',
          headerHeight: 'h-12'
        };
      case 'sm':
        return {
          showFullMenu: false,
          logoSize: 'text-xl',
          containerPadding: 'px-4',
          containerMaxWidth: 'max-w-full',
          userIconSize: 'text-3xl',
          headerHeight: 'h-14'
        };
      case 'md':
        return {
          showFullMenu: false,
          logoSize: 'text-xl',
          containerPadding: 'px-6',
          containerMaxWidth: 'max-w-full',
          userIconSize: 'text-3xl',
          headerHeight: 'h-14'
        };
      default:
        return {
          showFullMenu: true,
          logoSize: 'text-2xl',
          containerPadding: 'px-8',
          containerMaxWidth: 'max-w-[90%]',
          userIconSize: 'text-4xl',
          headerHeight: 'h-14'
        };
    }
  };

  const config = getResponsiveConfig();

  return (
    <>
      {/* Black banner only at the top with smooth transition */}
      <div
        className={classNames(
          'select-none w-full bg-black text-white text-center py-2 text-xs sm:text-sm font-semibold z-50 fixed top-0 left-0 transition-all duration-500',
          showBanner ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ minHeight: '32px' }}
      >
        <span className="hidden sm:inline">Exclusive discounts on selected products!</span>
        <span className="sm:hidden">Special offers available!</span>
      </div>

      <header
        ref={headerRef}
        className={classNames(
          'fixed w-full z-40 transition-all duration-500 bg-white select-none',
          config.headerHeight,
          showBanner ? 'mt-[0px]' : ''
        )}
        onMouseLeave={handleMenuMouseLeave}
        style={{
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
          top: showBanner ? '32px' : '0',
        }}
      >
        <div className={`${config.containerMaxWidth} mx-auto flex items-center ${config.headerHeight} ${config.containerPadding} justify-between lg:justify-around`}>
          {/* Logo */}
          <div className={`font-bold ${config.logoSize} text-gray-900 select-none tracking-tight flex-shrink-0`}>
            Logo
          </div>

          {/* Desktop Navigation */}
          {config.showFullMenu && (
            <nav className="flex-1 flex justify-center relative">
              <ul className="flex space-x-4 xl:space-x-8">
                {menuItems.map((item, idx) => (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMenuMouseEnter(idx)}
                    onMouseLeave={handleMenuMouseLeave}
                  >
                    <button
                      className={classNames(
                        'flex items-center gap-1 py-4 text-sm lg:text-base text-gray-800 hover:text-black transition-colors cursor-pointer bg-transparent font-semibold',
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
                            'ml-1 w-3 h-3 lg:w-4 lg:h-4 text-gray-500 transform transition-transform duration-200',
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
                        style={{
                          top: showBanner ? `${BANNER_HEIGHT + HEADER_HEIGHT}px` : `${HEADER_HEIGHT}px`,
                        }}
                        onMouseEnter={handleSubmenuMouseEnter}
                        onMouseLeave={handleSubmenuMouseLeave}
                      >
                        <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                          {item.submenu.map(subitem => (
                            <Link
                              key={subitem.label}
                              href={subitem.href}
                              className="block px-4 py-3 lg:px-6 lg:py-4 text-gray-700 hover:bg-gray-100 hover:text-black text-sm lg:text-base rounded transition-colors font-medium text-center"
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
          )}

          {/* Right side - User + Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Icon/Avatar */}
            {!user ? (
              <FiUser
                onClick={() => (window.location.href = '/Login')}
                className={`${config.userIconSize} p-1 sm:px-2 sm:py-1 text-gray-900 hover:text-gray-500 transition cursor-pointer`}
              />
            ) : (
              <span className="relative">
                <button
                  className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 font-bold text-sm sm:text-lg shadow focus:outline-none border border-gray-300 transition hover:scale-105 hover:shadow-md cursor-pointer"
                  onClick={() => setShowDropdown(prev => !prev)}
                  aria-label="User menu"
                  type="button"
                  style={{ transition: 'all 0.15s' }}
                >
                  {user.first_name?.charAt(0).toUpperCase() || <FiUser />}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-32 sm:w-36 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <button
                      className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </span>
            )}

            {/* Mobile Menu Button */}
            {!config.showFullMenu && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-900 hover:text-gray-500 transition cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {!config.showFullMenu && isMobileMenuOpen && (
          <div className="fixed inset-x-0 bg-white border-t border-gray-200 shadow-lg z-40"
               style={{ top: showBanner ? `${BANNER_HEIGHT + HEADER_HEIGHT}px` : `${HEADER_HEIGHT}px` }}>
            <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
              {menuItems.map((item, idx) => (
                <div key={item.label} className="border-b border-gray-100">
                  <button
                    className="w-full flex items-center justify-between px-4 py-4 text-left text-gray-800 hover:bg-gray-50 transition-colors font-semibold"
                    onClick={() => handleMobileSubmenu(idx)}
                  >
                    {item.label}
                    {item.submenu && (
                      <svg
                        className={classNames(
                          'w-4 h-4 text-gray-500 transform transition-transform duration-200',
                          openMenu === idx ? 'rotate-180' : 'rotate-0'
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  {item.submenu && openMenu === idx && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      {item.submenu.map(subitem => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setOpenMenu(null);
                          }}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Menu Backdrop */}
        {!config.showFullMenu && isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-30"
            style={{ top: showBanner ? `${BANNER_HEIGHT + HEADER_HEIGHT + 300}px` : `${HEADER_HEIGHT + 300}px` }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
}