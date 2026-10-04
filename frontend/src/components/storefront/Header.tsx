'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { Red7Logo } from '@/components/ui/Red7Logo';

export function Header() {
  const { openSideDrawer, openSearchModal } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rawItemCount = useCartStore((s) => s.getItemCount());
  const itemCount = mounted ? rawItemCount : 0;

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md pt-safe border-b border-neutral-100 transition-all">
      <div className="max-w-7xl mx-auto h-13 sm:h-14 md:h-16 px-3 sm:px-5 md:px-8 flex items-center justify-between relative">
        {/* Left: Hamburger Menu Button */}
        <div className="flex items-center">
          <button
            aria-label="Open Menu"
            onClick={openSideDrawer}
            className="w-10 h-10 md:hidden flex items-center justify-center text-black hover:text-[#e50914] transition-colors cursor-pointer active:scale-95 -ml-1.5"
            type="button"
          >
            {/* Minimalist 3-line hamburger */}
            <svg
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            >
              <line x1="1" y1="1.5" x2="20" y2="1.5" />
              <line x1="1" y1="7.5" x2="20" y2="7.5" />
              <line x1="1" y1="13.5" x2="20" y2="13.5" />
            </svg>
          </button>

          {/* Desktop Logo & Name */}
          <Link href="/" className="hidden md:flex items-center gap-2.5 ml-2 group">
            <Red7Logo size="md" />
            <span className="font-headline text-2xl tracking-tighter uppercase font-black text-black">
              RED<span className="text-[#e50914]">7</span>
            </span>
          </Link>
        </div>

        {/* Center: Mobile Centered Red Card Logo */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Link href="/" className="flex items-center justify-center" aria-label="RED7 Home">
            <Red7Logo size="md" />
          </Link>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-headline text-xs lg:text-sm uppercase tracking-wider font-bold text-black/85">
          <Link
            href="/shop"
            className="hover:text-[#e50914] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e50914] hover:after:w-full after:transition-all after:duration-200"
          >
            All Products
          </Link>
          <Link
            href="/shop?category=football-jerseys"
            className="hover:text-[#e50914] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e50914] hover:after:w-full after:transition-all after:duration-200"
          >
            Football Kits
          </Link>
          <Link
            href="/shop?category=streetwear"
            className="hover:text-[#e50914] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e50914] hover:after:w-full after:transition-all after:duration-200"
          >
            Streetwear
          </Link>
          <Link
            href="/shop?category=sportswear"
            className="hover:text-[#e50914] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e50914] hover:after:w-full after:transition-all after:duration-200"
          >
            Tracksuits
          </Link>
          <Link
            href="/track-order"
            className="hover:text-[#e50914] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e50914] hover:after:w-full after:transition-all after:duration-200"
          >
            Track Order
          </Link>
          <Link
            href="/reviews"
            className="hover:text-[#e50914] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#e50914] hover:after:w-full after:transition-all after:duration-200"
          >
            Reviews
          </Link>
        </nav>

        {/* Right actions: Search & Shopping Bag */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            aria-label="Search"
            onClick={openSearchModal}
            className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center text-black hover:text-[#e50914] transition-colors cursor-pointer active:scale-95"
            type="button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center text-black hover:text-[#e50914] transition-colors active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {mounted && itemCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 bg-[#e50914] text-white font-headline text-[10px] leading-[17px] rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            aria-label="My Account"
            className="hidden sm:flex w-9 h-9 rounded-full hover:bg-neutral-100 text-black hover:text-[#e50914] items-center justify-center transition-all active:scale-95"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
