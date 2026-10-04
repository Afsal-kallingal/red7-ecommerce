'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUIStore } from '@/store/uiStore';
import { Red7Logo } from '@/components/ui/Red7Logo';
import { Icon } from '@/components/ui/Icon';

export function SideDrawer() {
  const { isSideDrawerOpen, closeSideDrawer } = useUIStore();
  const [isCatalogExpanded, setIsCatalogExpanded] = useState(true);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isSideDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSideDrawer}
      />

      {/* Slide Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[84vw] max-w-[340px] bg-white flex flex-col shadow-2xl pt-safe pb-safe transition-transform duration-300 ease-out ${
          isSideDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-100">
          <button
            onClick={closeSideDrawer}
            className="h-11 flex items-center gap-1.5 text-black hover:text-[#e50914] font-headline text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
            type="button"
          >
            <Icon name="close" size={18} />
            <span>Close</span>
          </button>
          <Red7Logo size="sm" showText />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-neutral-100 scrollbar-none">
          <div className="py-1">
            <Link
              href="/"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>Home</span>
            </Link>
          </div>

          {/* Catalog Accordion */}
          <div className="py-1">
            <button
              onClick={() => setIsCatalogExpanded(!isCatalogExpanded)}
              className="w-full flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors text-left cursor-pointer"
              type="button"
            >
              <span>Collections</span>
              <Icon
                name="expand_more"
                size={18}
                className={`text-neutral-500 transition-transform duration-200 ${
                  isCatalogExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isCatalogExpanded && (
              <div className="pl-3 pb-2 space-y-1">
                <Link
                  href="/shop"
                  onClick={closeSideDrawer}
                  className="block py-1.5 font-headline text-xs uppercase tracking-wider font-semibold text-neutral-700 hover:text-[#e50914] transition-colors"
                >
                  All Products [409]
                </Link>
                <Link
                  href="/shop?category=football-jerseys"
                  onClick={closeSideDrawer}
                  className="block py-1.5 font-headline text-xs uppercase tracking-wider font-semibold text-neutral-700 hover:text-[#e50914] transition-colors"
                >
                  Football Kits (AC Milan, Argentina)
                </Link>
                <Link
                  href="/shop?category=streetwear"
                  onClick={closeSideDrawer}
                  className="block py-1.5 font-headline text-xs uppercase tracking-wider font-semibold text-neutral-700 hover:text-[#e50914] transition-colors"
                >
                  Streetwear & Oversized Hoodies
                </Link>
                <Link
                  href="/shop?category=sportswear"
                  onClick={closeSideDrawer}
                  className="block py-1.5 font-headline text-xs uppercase tracking-wider font-semibold text-neutral-700 hover:text-[#e50914] transition-colors"
                >
                  Tracksuits & Pre-Match Apparel
                </Link>
              </div>
            )}
          </div>

          <div className="py-1">
            <Link
              href="/track-order"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>Track Order</span>
            </Link>
          </div>

          <div className="py-1">
            <Link
              href="/cart"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>Shopping Bag</span>
            </Link>
          </div>

          <div className="py-1">
            <Link
              href="/wishlist"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>Wishlist</span>
            </Link>
          </div>

          <div className="py-1">
            <Link
              href="/reviews"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>Reviews & Drops</span>
            </Link>
          </div>

          <div className="py-1">
            <Link
              href="/coupons"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>Discount Codes</span>
            </Link>
          </div>

          <div className="py-1">
            <Link
              href="/faq"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>FAQ & Sizing</span>
            </Link>
          </div>

          <div className="py-1">
            <Link
              href="/contact"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>WhatsApp Support</span>
            </Link>
          </div>

          <div className="py-1">
            <Link
              href="/account"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-black hover:text-[#e50914] font-bold transition-colors"
            >
              <span>My Account</span>
            </Link>
          </div>

          {/* Admin panel link */}
          <div className="py-1">
            <Link
              href="/admin"
              onClick={closeSideDrawer}
              className="flex items-center justify-between h-11 font-headline text-base uppercase tracking-wide text-[#e50914] font-black hover:underline transition-colors"
            >
              <span>Admin Portal</span>
              <Icon name="shield" size={18} />
            </Link>
          </div>
        </nav>

        {/* Footer Pill */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <p className="font-headline text-xs uppercase tracking-wider text-neutral-500 font-bold">
            RED7 VERIFIED • ALL-INDIA EXPRESS
          </p>
          <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
        </div>
      </aside>
    </>
  );
}
