'use client';

import React, { useState } from 'react';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { api } from '@/services/api';
import { Order } from '@/types/order';
import { FyndImage } from '@/components/ui/FyndImage';
import { Icon } from '@/components/ui/Icon';
import { formatINR } from '@/lib/utils';

export default function TrackOrderPage() {
  const [allocationInput, setAllocationInput] = useState('88291');
  const [order, setOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocationInput.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await api.getOrderById(allocationInput.trim());
      setOrder(data);
    } catch (e) {
      console.error(e);
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="font-headline-lg-mobile md:text-3xl uppercase text-on-surface font-bold tracking-tight">
              LIVE DISPATCH RADAR
            </h1>
            <p className="font-body-sm text-on-surface-variant mt-1 text-sm md:text-base">
              Enter your allocation ID (e.g. 88291) or contact number to inspect airline dispatch status.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              value={allocationInput}
              onChange={(e) => setAllocationInput(e.target.value)}
              placeholder="Enter Allocation ID / Order ID"
              className="flex-1 bg-surface-container-low px-4 py-3 font-headline-sm text-sm uppercase tracking-wider text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              Locate
            </button>
          </form>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant gap-3">
              <Icon name="progress_activity" size={32} className="text-primary" />
              <p className="font-label-caps uppercase text-xs tracking-wider">Querying Logistics Hub...</p>
            </div>
          ) : order ? (
            <div className="flex flex-col gap-6 mt-2">
              {/* Tracker Card */}
              <div className="bg-surface-container-lowest p-6 border border-outline-variant/20 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
                  <div>
                    <span className="font-label-caps text-primary uppercase font-bold text-xs block">
                      ALLOCATION ID
                    </span>
                    <span className="font-headline-sm uppercase text-on-surface font-bold text-lg">
                      {order.allocationId}
                    </span>
                  </div>
                  <span className="bg-primary/10 text-primary border border-primary/20 font-label-caps text-xs px-3 py-1 uppercase font-bold tracking-wider">
                    {order.status}
                  </span>
                </div>

                {/* Stepper */}
                <div className="relative flex items-center justify-between w-full pt-6 pb-4 px-2">
                  <div className="absolute top-9 left-6 right-6 h-1 bg-surface-container-highest -z-0" />
                  <div className="absolute top-9 left-6 w-1/4 h-1 bg-primary -z-0" />

                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
                      <Icon name="check" size={16} />
                    </div>
                    <span className="font-ticker-item uppercase text-on-surface font-bold text-xs">
                      Placed
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center ring-2 ring-primary">
                      <Icon name="package" size={16} />
                    </div>
                    <span className="font-ticker-item uppercase text-primary font-bold text-xs">
                      Packed
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <div className="w-8 h-8 rounded-full bg-surface-container text-outline flex items-center justify-center">
                      <Icon name="local_shipping" size={16} />
                    </div>
                    <span className="font-ticker-item uppercase text-outline font-bold text-xs">
                      Transit
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <div className="w-8 h-8 rounded-full bg-surface-container text-outline flex items-center justify-center">
                      <Icon name="check_circle" size={16} />
                    </div>
                    <span className="font-ticker-item uppercase text-outline font-bold text-xs">
                      Delivered
                    </span>
                  </div>
                </div>

                <div className="mt-2 bg-surface-container-low p-3 text-xs md:text-sm text-on-surface-variant flex items-center gap-2.5 border border-outline-variant/10">
                  <Icon name="info" size={18} className="text-primary shrink-0" />
                  <span>
                    Carrier: <strong className="text-on-surface">{order.courierName}</strong> • AWB:{' '}
                    <strong className="text-on-surface">{order.trackingAwb}</strong>
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-surface-container-lowest p-6 border border-outline-variant/20 shadow-sm flex flex-col gap-4">
                <span className="font-label-caps uppercase text-on-surface font-bold text-xs tracking-wider">
                  PACKAGE CONTENTS
                </span>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-surface-container relative shrink-0 overflow-hidden border border-outline-variant/10">
                      <FyndImage
                        src={item.image}
                        alt={item.title}
                        fallbackType="kit"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline-sm uppercase text-sm text-on-surface font-bold truncate">
                        {item.title}
                      </h4>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                        Size: <span className="font-bold text-on-surface">{item.size}</span> • Qty: {item.quantity}
                      </p>
                      <span className="font-price-current text-sm text-primary font-bold block mt-1">
                        {formatINR(item.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : hasSearched ? (
            <div className="py-16 text-center bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm flex flex-col items-center justify-center">
              <Icon name="search_off" size={48} className="text-outline-variant mb-3" />
              <h3 className="font-headline-sm uppercase text-on-surface font-bold text-lg">
                No Allocation Record Found
              </h3>
              <p className="font-body-sm text-on-surface-variant mt-1 text-sm">
                Please check the ID in your SMS or email confirmation.
              </p>
            </div>
          ) : null}
        </div>
        <Footer />
      </main>
    </>
  );
}
