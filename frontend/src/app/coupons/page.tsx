'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { Icon } from '@/components/ui/Icon';
import { useUIStore } from '@/store/uiStore';
import { api } from '@/services/api';
import { CouponItem } from '@/types/cms';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const { showToast } = useUIStore();

  useEffect(() => {
    api.getCoupons().then(setCoupons);
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Code "${code}" copied to clipboard!`, 'GO TO BAG', '/cart');
  };

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="font-headline-lg-mobile md:text-3xl uppercase text-on-surface font-bold tracking-tight">
              PROMO VOUCHERS & OFFERS
            </h1>
            <p className="font-body-sm text-on-surface-variant mt-1 text-sm md:text-base">
              Copy promo codes to unlock automated bundle savings at checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((c) => (
              <div
                key={c.id}
                className="bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/10">
                    <div className="flex items-center gap-2">
                      <Icon name="tag" size={18} className="text-primary" />
                      <span className="font-headline-sm uppercase text-on-surface font-bold text-sm">
                        {c.title}
                      </span>
                    </div>
                    <span className="bg-primary/10 text-primary border border-primary/20 font-label-caps text-[10px] px-2 py-0.5 uppercase font-bold tracking-wider">
                      ACTIVE
                    </span>
                  </div>

                  <p className="font-body-sm text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-2 pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="font-label-caps text-xs tracking-wider px-2.5 py-1 bg-surface-container-low text-primary font-bold border border-primary/20">
                    {c.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyCode(c.code)}
                    className="px-4 py-1.5 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider font-bold shadow-xs hover:bg-primary-container active:scale-95 transition-all"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-primary text-on-primary shadow-sm flex flex-col gap-2">
            <span className="font-label-caps text-tertiary-fixed font-bold uppercase tracking-wider text-xs">
              FLASH AUTOMATION
            </span>
            <h3 className="font-headline-md uppercase font-bold text-xl md:text-2xl">
              BUY 4 KITS, GET 1 FREE INSTANTLY
            </h3>
            <p className="font-body-sm text-xs md:text-sm text-on-primary-container/90 max-w-2xl leading-relaxed">
              No code required for standard drops. Simply add any 4 current season club jerseys to your bag, and the lowest-priced kit is credited automatically.
            </p>
            <Link
              href="/shop?category=football-jerseys"
              className="mt-3 self-start px-6 py-2.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-white hover:text-primary transition-colors"
            >
              Shop Kits Now
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
