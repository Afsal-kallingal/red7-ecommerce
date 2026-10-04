'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { api } from '@/services/api';
import { Order } from '@/types/order';
import { FyndImage } from '@/components/ui/FyndImage';
import { Icon } from '@/components/ui/Icon';
import { formatINR } from '@/lib/utils';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <h1 className="font-headline-lg-mobile md:text-3xl uppercase text-on-surface font-bold tracking-tight">
              MY DROP ORDERS
            </h1>
            <span className="bg-surface-container-high px-2.5 py-0.5 text-on-surface-variant font-ticker-item rounded font-bold">
              {orders.length}
            </span>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant gap-3">
              <Icon name="progress_activity" size={32} className="text-primary" />
              <span className="font-label-caps uppercase text-xs tracking-wider">Loading orders...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm flex flex-col items-center justify-center">
              <Icon name="package" size={48} className="text-outline-variant mb-4" />
              <p className="font-headline-sm uppercase text-on-surface font-bold text-lg">No Past Orders Found</p>
              <p className="font-body-sm text-on-surface-variant mt-1 mb-6 text-sm">
                Reserve your favorite 2026/27 European kits with instant dispatch.
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold hover:bg-primary-container transition-colors"
              >
                Browse 26/27 Catalog
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-sm flex flex-col gap-4 hover:border-outline-variant/40 transition-colors"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
                    <div>
                      <span className="font-headline-sm uppercase text-on-surface font-bold text-base">
                        {ord.allocationId}
                      </span>
                      <span className="font-body-sm text-xs text-on-surface-variant block mt-0.5">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <span className="bg-primary/10 text-primary border border-primary/20 font-label-caps text-xs px-2.5 py-1 uppercase font-bold tracking-wider">
                      {ord.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {ord.items.map((item, idx) => (
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
                            {formatINR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                    <span className="font-headline-sm text-base text-primary font-bold">
                      Total: {formatINR(ord.total)}
                    </span>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/track-order?trackingId=${ord.allocationId.replace('#', '')}`}
                        className="px-4 py-2 border border-outline-variant text-on-surface font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-surface-container-high transition-colors"
                      >
                        Track Courier
                      </Link>
                      <Link
                        href={`/order-confirmation/${ord.allocationId.replace('#', '')}`}
                        className="px-4 py-2 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-primary-container transition-colors"
                      >
                        View Receipt
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
