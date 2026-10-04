'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { FyndImage } from '@/components/ui/FyndImage';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { api } from '@/services/api';
import { formatINR } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getTotal,
    getItemCount,
  } = useCartStore();
  const { showToast } = useUIStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = getSubtotal();
  const total = getTotal();
  const itemCount = mounted ? getItemCount() : 0;

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim();
    if (!code) return;
    setCouponError('');

    const res = await api.validateCoupon(code, subtotal);
    if (res.valid) {
      applyCoupon(code, res.discount);
      showToast(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-28 md:pb-12 bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-6xl mx-auto px-margin md:px-6 pt-space-md">
          {/* Cart Header */}
          <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20 mb-space-md">
            <div className="flex items-center gap-space-xs">
              <h1 className="font-headline-lg-mobile md:font-headline-lg uppercase tracking-tight text-on-surface font-bold">
                MY BAG
              </h1>
              <span suppressHydrationWarning className="bg-surface-container-high px-2 py-0.5 text-on-surface-variant font-ticker-item rounded font-bold">
                {itemCount} ITEMS
              </span>
            </div>
            <Link
              href="/shop"
              className="font-label-caps text-label-caps uppercase text-primary font-bold hover:underline"
            >
              + ADD MORE
            </Link>
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <div className="py-20 flex flex-col items-center justify-center text-center bg-surface-container-lowest p-6 border border-outline-variant/20 shadow-sm my-4">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
                <Icon name="shopping_bag" size={32} />
              </div>
              <h2 className="font-headline-md uppercase text-on-surface font-bold">
                Your Bag Is Empty
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-6 max-w-xs">
                Explore the latest 26/27 club drops and oversized streetwear hoodies.
              </p>
              <Link
                href="/shop"
                className="px-8 py-3 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                EXPLORE 26/27 DROPS
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column (Items & Coupons): 7 cols on desktop */}
              <div className="md:col-span-7 flex flex-col gap-3">
                {/* Free Express Air Shipping Progress */}
                <div className="bg-primary-container text-on-primary p-space-sm mb-1 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="local_shipping" size={20} className="text-tertiary-fixed" />
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-surface-bright">
                      UNLOCKED COMPLIMENTARY EXPRESS AIR DELIVERY
                    </span>
                  </div>
                  <span className="font-ticker-item text-tertiary-fixed font-bold uppercase">
                    PAN-INDIA
                  </span>
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 bg-surface-container-lowest p-3 border border-outline-variant/20 shadow-sm relative"
                    >
                      <Link
                        href={`/products/${item.slug}`}
                        className="w-20 h-24 bg-surface-container-low relative shrink-0 overflow-hidden"
                      >
                        <FyndImage
                          src={item.image}
                          alt={item.title}
                          fallbackType="kit"
                          fill
                          className="object-cover"
                        />
                      </Link>

                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <Link href={`/products/${item.slug}`}>
                              <h3 className="font-headline-sm uppercase text-on-surface line-clamp-1 font-bold hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                removeItem(item.id);
                                showToast(`Removed from bag`);
                              }}
                              aria-label="Remove Item"
                              className="text-on-surface-variant hover:text-error transition-colors p-0.5 cursor-pointer"
                            >
                              <Icon name="delete" size={18} />
                            </button>
                          </div>
                          <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                            Size: <strong className="text-on-surface">{item.size}</strong>
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center bg-surface-container-high border border-outline-variant/20">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 cursor-pointer"
                            >
                              <Icon name="remove" size={14} />
                            </button>
                            <span className="w-7 text-center font-headline-sm text-xs font-bold text-on-surface select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 cursor-pointer"
                            >
                              <Icon name="add" size={14} />
                            </button>
                          </div>

                          <div className="flex items-baseline gap-1.5">
                            <span className="font-price-current text-primary font-bold">
                              {formatINR(item.price * item.quantity)}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="font-price-original text-on-surface-variant line-through text-[11px]">
                                {formatINR(item.originalPrice * item.quantity)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Redemption Section */}
                <div className="mt-3 bg-surface-container-lowest p-space-md border border-outline-variant/20 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps uppercase text-on-surface font-bold tracking-wider">
                      APPLY COUPON CODE
                    </span>
                    <Link
                      href="/coupons"
                      className="font-ticker-item uppercase text-primary font-bold hover:underline"
                    >
                      View All Coupons
                    </Link>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-primary-container/10 p-2.5 border border-primary-container/30">
                      <div className="flex items-center gap-2">
                        <Icon name="check_circle" size={18} className="text-primary" />
                        <div className="flex flex-col">
                          <span className="font-headline-sm text-xs text-primary font-bold">
                            CODE: {appliedCoupon}
                          </span>
                          <span className="font-body-sm text-[11px] text-on-surface-variant">
                            Saved {formatINR(discountAmount)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removeCoupon();
                          showToast('Coupon removed');
                        }}
                        className="font-label-caps text-xs text-error font-bold uppercase hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="ENTER CODE (e.g. MADRIDISTA)"
                          className="flex-1 bg-surface-container-low px-3 py-2 text-on-surface font-headline-sm text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyCoupon()}
                          className="px-4 py-2 bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-caps uppercase tracking-wider font-bold transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <span className="font-body-sm text-xs text-error">{couponError}</span>
                      )}
                      {/* Suggested Chips */}
                      <div className="flex gap-1.5 pt-1 overflow-x-auto scrollbar-none">
                        {['MADRIDISTA', 'BUY4GET1', 'FIRSTDROP10'].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => handleApplyCoupon(chip)}
                            className="px-2 py-0.5 bg-surface-container text-on-surface font-ticker-item uppercase hover:bg-primary hover:text-on-primary transition-colors text-[10px] cursor-pointer"
                          >
                            + {chip}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column (Summary & Checkout CTA): 5 cols on desktop */}
              <div className="md:col-span-5 md:sticky md:top-20 flex flex-col gap-3">
                {/* Order Summary Breakdown */}
                <div className="bg-surface-container-lowest p-space-md border border-outline-variant/20 shadow-sm flex flex-col gap-3">
                  <span className="font-label-caps uppercase text-on-surface font-bold tracking-wider pb-1 border-b border-outline-variant/20">
                    BILL SUMMARY
                  </span>
                  <div className="flex justify-between items-center text-body-sm">
                    <span className="text-on-surface-variant">Bag Subtotal</span>
                    <span className="font-price-current text-on-surface">{formatINR(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-body-sm text-primary font-bold">
                      <span>Coupon Discount</span>
                      <span>- {formatINR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-body-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-on-surface-variant">Express Terrace Freight</span>
                      <span className="bg-primary text-on-primary font-ticker-item text-[10px] px-1 py-0.2 uppercase">
                        FREE
                      </span>
                    </div>
                    <span className="font-price-current text-primary">₹0.00</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 mt-1 border-t border-outline-variant/20">
                    <span className="font-label-caps uppercase text-on-surface font-bold tracking-wider">
                      TOTAL PAYABLE
                    </span>
                    <span className="font-headline-md text-primary font-bold">{formatINR(total)}</span>
                  </div>

                  {/* Desktop Direct Checkout Button */}
                  <button
                    type="button"
                    onClick={() => router.push('/checkout')}
                    className="hidden md:flex w-full h-12 bg-primary text-on-primary font-headline-sm uppercase tracking-wider font-bold shadow-md hover:bg-primary/90 active:scale-95 transition-all items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Proceed To Checkout</span>
                    <Icon name="arrow_forward" size={18} />
                  </button>
                </div>

                {/* Trust Strip */}
                <div className="py-3 bg-surface-container-low p-3 border border-outline-variant/20 text-center flex items-center justify-around text-[11px] text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Icon name="verified" size={16} className="text-primary" />
                    100% Authentic Replica
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="sync_alt" size={16} className="text-primary" />
                    7-Day Doorstep Exchange
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12">
            <Footer />
          </div>
        </div>
      </main>

      {/* Sticky Bottom Checkout CTA (Mobile only) */}
      {items.length > 0 && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-margin py-2.5 flex items-center justify-between pb-safe border-t border-outline-variant/20">
          <div className="flex flex-col">
            <span className="font-ticker-item text-on-surface-variant uppercase">
              {itemCount} Items Selected
            </span>
            <span className="font-headline-md text-primary font-bold leading-none">
              {formatINR(total)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="h-12 px-6 bg-primary text-on-primary font-headline-sm uppercase tracking-wider font-bold shadow-md hover:bg-primary/90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed To Checkout</span>
            <Icon name="arrow_forward" size={18} />
          </button>
        </div>
      )}
    </>
  );
}
