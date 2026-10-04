'use client';

import React from 'react';
import Link from 'next/link';
import { Red7Logo } from '@/components/ui/Red7Logo';

export function Footer() {
  return (
    <footer className="w-full bg-[#f8f8f8] border-t border-neutral-200/80 pt-10 pb-16 md:pb-12 text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="flex flex-col md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Red7Logo size="sm" />
              <span className="font-headline text-2xl uppercase text-black font-black tracking-tighter">
                RED<span className="text-[#e50914]">7</span>
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
              Curated matchday football kits, retro heritage jerseys, and streetwear tracksuits for supporters across India. Express 48h dispatch & instant UPI checkout.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs font-headline uppercase tracking-wider text-neutral-500 font-bold">
              <span>Authentic Stitch</span>
              <span>•</span>
              <span>Pan-India Courier</span>
              <span>•</span>
              <span>7-Day Exchange</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <span className="font-headline text-xs uppercase text-black font-bold tracking-wider">
              COLLECTIONS
            </span>
            <Link href="/shop?category=football-jerseys" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              AC Milan & Retro Kits
            </Link>
            <Link href="/shop?category=football-jerseys" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              Argentina & Messi Specials
            </Link>
            <Link href="/shop?category=streetwear" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              Streetwear Tracksuits
            </Link>
            <Link href="/shop" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              All 400+ Products
            </Link>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col gap-2">
            <span className="font-headline text-xs uppercase text-black font-bold tracking-wider">
              HELP & SUPPORT
            </span>
            <Link href="/track-order" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              Track Order Status
            </Link>
            <Link href="/faq" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              Shipping & Jersey Sizing
            </Link>
            <Link href="/reviews" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              Buyer Reviews & Unboxing
            </Link>
            <Link href="/contact" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              WhatsApp Support
            </Link>
            <Link href="/policies" className="font-body text-xs text-neutral-600 hover:text-[#e50914] transition-colors">
              Exchange & Refund Policy
            </Link>
          </div>
        </div>

        <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-t border-neutral-200">
          <span className="font-body text-[11px] text-neutral-500">
            © 2026 RED7 APPAREL CO. ALL RIGHTS RESERVED.
          </span>
          <span className="font-headline text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
            ENGINEERED FOR SUPPORTERS WORLDWIDE
          </span>
        </div>
      </div>
    </footer>
  );
}
