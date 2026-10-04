'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { Icon } from '@/components/ui/Icon';

export function BottomNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());

  // Do not show bottom nav on checkout or admin pages
  if (pathname?.startsWith('/checkout') || pathname?.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';
  const isShop = pathname === '/shop' || pathname?.startsWith('/shop') || pathname?.startsWith('/categories');
  const isCart = pathname === '/cart';
  const isAccount = pathname === '/account' || pathname?.startsWith('/account');

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-outline-variant/20">
      <div className="flex justify-around items-center h-14 px-space-xs max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
            isHome ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Icon name="home" size={20} className={isHome ? 'stroke-[2.5]' : 'stroke-1.5'} />
          <span className="font-label-caps text-[10px] uppercase tracking-wider mt-1">Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
            isShop ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Icon name="grid_view" size={20} className={isShop ? 'stroke-[2.5]' : 'stroke-1.5'} />
          <span className="font-label-caps text-[10px] uppercase tracking-wider mt-1">Shop</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`relative flex flex-col items-center justify-center w-16 h-12 transition-colors ${
            isCart ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Icon name="shopping_bag" size={20} className={isCart ? 'stroke-[2.5]' : 'stroke-1.5'} />
          {itemCount > 0 && (
            <span className="absolute top-1 right-3 min-w-[16px] h-4 px-1 bg-primary text-on-primary font-headline-sm text-[9px] leading-4 rounded-full flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
          <span className="font-label-caps text-[10px] uppercase tracking-wider mt-1">Cart</span>
        </Link>

        {/* Account */}
        <Link
          href="/account"
          className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
            isAccount ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Icon name="person" size={20} className={isAccount ? 'stroke-[2.5]' : 'stroke-1.5'} />
          <span className="font-label-caps text-[10px] uppercase tracking-wider mt-1">Account</span>
        </Link>
      </div>
    </nav>
  );
}
