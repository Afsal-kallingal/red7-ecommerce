'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Overview', href: '/admin', icon: 'dashboard' },
    { label: 'Products', href: '/admin/products', icon: 'apparel' },
    { label: 'Inventory', href: '/admin/inventory', icon: 'inventory_2' },
    { label: 'Orders', href: '/admin/orders', icon: 'shopping_bag' },
    { label: 'Media Vault', href: '/admin/media', icon: 'image' },
    { label: 'Banners & CMS', href: '/admin/banners', icon: 'view_carousel' },
    { label: 'Coupons', href: '/admin/coupons', icon: 'confirmation_number' },
    { label: 'Customers', href: '/admin/customers', icon: 'group' },
    { label: 'Reviews', href: '/admin/reviews', icon: 'reviews' },
  ];

  return (
    <aside className="w-64 bg-primary text-on-primary flex-col shrink-0 hidden md:flex min-h-screen">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-headline-md tracking-wider text-xl uppercase font-black text-tertiary-fixed">
            FYND
          </span>
          <span className="bg-primary-container px-1.5 py-0.5 font-label-caps text-[10px] text-tertiary-fixed font-bold uppercase">
            ADMIN
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 font-label-caps uppercase text-xs tracking-wider transition-colors ${
                isActive
                  ? 'bg-primary-container text-tertiary-fixed font-bold shadow-xs'
                  : 'text-on-primary/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon name={link.icon} size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Storefront Link */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 bg-white/10 text-on-primary font-label-caps text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
        >
          <span>View Storefront</span>
          <Icon name="open_in_new" size={16} />
        </Link>
      </div>
    </aside>
  );
}
