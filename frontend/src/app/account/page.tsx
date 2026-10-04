'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { Icon } from '@/components/ui/Icon';

export default function AccountPage() {
  const profile = {
    name: 'Rohan Sen',
    email: 'rohan.sen@example.com',
    phone: '+91 98765 43210',
    memberTier: 'TERRACE VIP DROP CLUB',
    savedAddressesCount: 2,
    completedOrdersCount: 4,
  };

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-primary-container text-on-primary p-6 md:p-8 shadow-sm relative overflow-hidden border border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-2xl uppercase tracking-wider">
                {profile.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-tertiary-fixed font-bold tracking-wider uppercase text-[11px]">
                  {profile.memberTier}
                </span>
                <h1 className="font-headline-md uppercase text-on-primary font-bold text-2xl md:text-3xl">
                  {profile.name}
                </h1>
                <span className="font-body-sm text-[12px] md:text-sm text-on-primary-container/80">
                  {profile.phone} • {profile.email}
                </span>
              </div>
            </div>
          </div>

          {/* Account Navigation Grid */}
          <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-sm divide-y divide-outline-variant/10">
            <Link
              href="/orders"
              className="flex items-center justify-between p-4 md:p-5 hover:bg-surface-container-low transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="shopping_bag" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm uppercase text-on-surface font-bold text-sm md:text-base">
                    Orders & Tracking
                  </span>
                  <span className="font-body-sm text-[11px] md:text-xs text-on-surface-variant">
                    View receipts & live courier timeline
                  </span>
                </div>
              </div>
              <Icon name="chevron_right" size={18} className="text-outline group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/account/addresses"
              className="flex items-center justify-between p-4 md:p-5 hover:bg-surface-container-low transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="pin_drop" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm uppercase text-on-surface font-bold text-sm md:text-base">
                    Delivery Addresses
                  </span>
                  <span className="font-body-sm text-[11px] md:text-xs text-on-surface-variant">
                    {profile.savedAddressesCount} saved destinations
                  </span>
                </div>
              </div>
              <Icon name="chevron_right" size={18} className="text-outline group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center justify-between p-4 md:p-5 hover:bg-surface-container-low transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="favorite" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm uppercase text-on-surface font-bold text-sm md:text-base">
                    Saved Wishlist
                  </span>
                  <span className="font-body-sm text-[11px] md:text-xs text-on-surface-variant">
                    Reserved drops & personal alerts
                  </span>
                </div>
              </div>
              <Icon name="chevron_right" size={18} className="text-outline group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/coupons"
              className="flex items-center justify-between p-4 md:p-5 hover:bg-surface-container-low transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="confirmation_number" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm uppercase text-on-surface font-bold text-sm md:text-base">
                    Coupons & Offers
                  </span>
                  <span className="font-body-sm text-[11px] md:text-xs text-on-surface-variant">
                    Active promo vouchers
                  </span>
                </div>
              </div>
              <Icon name="chevron_right" size={18} className="text-outline group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-between p-4 md:p-5 hover:bg-surface-container-low transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name="chat" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm uppercase text-on-surface font-bold text-sm md:text-base">
                    Direct Concierge Support
                  </span>
                  <span className="font-body-sm text-[11px] md:text-xs text-on-surface-variant">
                    WhatsApp & Email ticketing
                  </span>
                </div>
              </div>
              <Icon name="chevron_right" size={18} className="text-outline group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/admin"
              className="flex items-center justify-between p-4 md:p-5 bg-surface-container-high/40 hover:bg-surface-container-high transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <Icon name="admin_panel_settings" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm uppercase text-primary font-bold text-sm md:text-base">
                    Admin Control Panel
                  </span>
                  <span className="font-body-sm text-[11px] md:text-xs text-on-surface-variant">
                    Manage catalog, stock & orders
                  </span>
                </div>
              </div>
              <Icon name="arrow_forward" size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
