'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Order } from '@/types/order';
import { FyndImage } from '@/components/ui/FyndImage';
import { formatINR } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const rawId = resolvedParams.id;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function load() {
      const data = await api.getOrderById(rawId);
      setOrder(data);
    }
    load();
  }, [rawId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Icon name="refresh" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const firstItem = order.items[0];

  const handleWhatsAppAlerts = () => {
    const text = `Hi RED7 Support, please send me WhatsApp dispatch updates for Allocation ID ${order.allocationId}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-surface font-body-md text-on-surface pt-safe pb-safe flex flex-col min-h-screen">
      <main className="flex flex-col relative w-full bg-surface">
        <div className="flex flex-col w-full pb-16">
          {/* Announcement Ticker */}
          <div className="w-full bg-secondary-container py-2 overflow-hidden select-none border-b border-outline-variant/20">
            <div className="flex whitespace-nowrap animate-marquee gap-6 text-on-secondary-fixed">
              <span className="font-ticker-item text-ticker-item uppercase tracking-widest">
                DROP SECURED // PAN-INDIA EXPRESS AIRLINE LOGISTICS
              </span>
              <span className="font-ticker-item text-ticker-item uppercase tracking-widest font-bold">
                •
              </span>
              <span className="font-ticker-item text-ticker-item uppercase tracking-widest">
                AUTHENTIC PLAYER SPECIFICATION // ZERO REPRODUCTIONS
              </span>
              <span className="font-ticker-item text-ticker-item uppercase tracking-widest font-bold">
                •
              </span>
              <span className="font-ticker-item text-ticker-item uppercase tracking-widest">
                LOCKER ROOM ALLOCATION LOCKED // {order.allocationId}
              </span>
              <span className="font-ticker-item text-ticker-item uppercase tracking-widest font-bold">
                •
              </span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full px-margin md:px-6 pt-4 flex flex-col gap-4">
            {/* Hero Confirmed Card */}
            <div className="relative w-full bg-primary-container text-on-primary p-6 overflow-hidden shadow-md rounded-none md:rounded-xl">
              <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none select-none">
                <span className="font-display text-8xl text-surface">RED7</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                  <Icon name="check" size={16} />
                </div>
                <span className="font-label-caps text-label-caps tracking-widest text-primary-fixed uppercase font-bold">
                  TERRACE DROP {order.allocationId} SECURED
                </span>
              </div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase tracking-tight text-on-primary mb-1 font-extrabold">
                ORDER CONFIRMED
              </h1>
              <p className="font-body-sm text-body-sm text-on-primary-container max-w-sm">
                Your RED7 drop is officially reserved and prioritized for production dispatch.
              </p>

              <div className="mt-5 pt-4 bg-surface/10 p-3 flex items-center justify-between border border-white/10 rounded-sm">
                <div>
                  <span className="block font-label-caps text-label-caps text-primary-fixed uppercase font-bold">
                    ALLOCATION ID
                  </span>
                  <span className="font-headline-sm text-headline-sm uppercase text-on-primary font-bold">
                    {order.allocationId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-label-caps text-label-caps text-on-primary-container uppercase font-bold">
                    DELIVERY WINDOW
                  </span>
                  <span className="font-body-sm text-body-sm text-on-primary font-bold">
                    {order.estimatedDelivery}
                  </span>
                </div>
              </div>
            </div>

            {/* Dispatch Tracker Stepper */}
            <div className="bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/20 rounded-none md:rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
                  DISPATCH TRACKER
                </span>
                <span className="font-label-caps text-label-caps text-surface-tint uppercase font-bold">
                  AIRLINE PRIORITY
                </span>
              </div>

              <div className="relative flex items-center justify-between w-full pt-1 pb-3 px-2">
                <div className="absolute top-3 left-4 right-4 h-0.5 bg-surface-container-highest -z-0" />
                <div className="absolute top-3 left-4 w-1/4 h-0.5 bg-primary-container -z-0" />

                {/* Placed */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                    <Icon name="check" size={12} />
                  </div>
                  <span className="font-ticker-item text-ticker-item text-on-surface uppercase font-bold">
                    PLACED
                  </span>
                </div>

                {/* Packed */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-container text-secondary flex items-center justify-center ring-2 ring-surface-container-high">
                    <Icon name="package" size={12} />
                  </div>
                  <span className="font-ticker-item text-ticker-item text-secondary uppercase font-bold">
                    PACKED
                  </span>
                </div>

                {/* Transit */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-container text-secondary flex items-center justify-center">
                    <Icon name="local_shipping" size={12} />
                  </div>
                  <span className="font-ticker-item text-ticker-item text-secondary uppercase font-bold">
                    TRANSIT
                  </span>
                </div>

                {/* Delivered */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-container text-secondary flex items-center justify-center">
                    <Icon name="check_circle" size={12} />
                  </div>
                  <span className="font-ticker-item text-ticker-item text-secondary uppercase font-bold">
                    DELIVERED
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low p-2.5 flex items-center gap-2 mt-2 border border-outline-variant/10">
                <Icon name="bolt" size={16} className="text-surface-tint shrink-0" />
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                  Express 48H Courier: In transit to Kempegowda Logistics Hub.
                </p>
              </div>
            </div>

            {/* Vault Receipt */}
            <div className="bg-surface-container-lowest p-5 shadow-xs flex flex-col gap-3 border border-outline-variant/20 rounded-none md:rounded-lg">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/10">
                <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
                  VAULT RECEIPT
                </span>
                <span className="bg-surface-container px-2 py-0.5 font-label-caps text-label-caps uppercase text-on-surface-variant font-bold">
                  PAID VERIFIED
                </span>
              </div>

              {firstItem && (
                <div className="flex gap-3 items-start">
                  <div className="w-20 h-24 bg-surface-container-high shrink-0 overflow-hidden relative shadow-xs">
                    <FyndImage
                      src={firstItem.image}
                      alt={firstItem.title}
                      fallbackType="kit"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-1 left-1 bg-primary text-on-primary text-[0.625rem] px-1 font-bold uppercase tracking-wider">
                      OFFICIAL
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface truncate font-bold">
                      {firstItem.title}
                    </h2>
                    <span className="font-label-caps text-label-caps text-surface-tint mt-0.5 uppercase tracking-wide font-bold">
                      {firstItem.subtitle || 'Official Matchday Spec'}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Size: {firstItem.size} • Tailored Player Fit
                    </span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-price-current text-price-current text-on-surface">
                        {formatINR(firstItem.price)}
                      </span>
                      {firstItem.originalPrice && (
                        <span className="font-price-original text-price-original text-outline line-through">
                          {formatINR(firstItem.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Itemized receipt charges */}
              <div className="bg-surface-container-low p-3 flex flex-col gap-1.5 mt-1 border border-outline-variant/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-body-sm text-on-surface-variant">Subtotal</span>
                  <span className="font-body-sm text-on-surface font-medium">
                    {formatINR(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-body-sm text-on-surface-variant">
                    Express Insured Freight
                  </span>
                  <span className="font-label-caps text-label-caps text-primary uppercase font-bold">
                    COMPLIMENTARY
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-body-sm text-on-surface-variant">
                    Drop Tax & Surcharge
                  </span>
                  <span className="font-body-sm text-on-surface font-medium">₹0.00</span>
                </div>
                <div className="pt-2 mt-1 flex justify-between items-center border-t border-outline-variant/20">
                  <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
                    TOTAL CHARGED
                  </span>
                  <span className="font-headline-md text-headline-md text-primary font-bold">
                    {formatINR(order.total)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-on-surface-variant">
                <Icon name="credit_card" size={16} className="text-surface-tint" />
                <span className="font-body-sm text-body-sm truncate">
                  {order.paymentMethod} • Ref: {order.paymentRef}
                </span>
              </div>
            </div>

            {/* Shipping Destination */}
            <div className="bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/20 rounded-none md:rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
                  SHIPPING DESTINATION
                </span>
                <Icon name="map_pin" size={16} className="text-on-surface-variant" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
                  {order.shippingAddress.fullName}
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}
                </p>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 font-medium">
                  {order.shippingAddress.phone}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <Link
                href="/track-order"
                className="flex-1 bg-primary-container text-on-primary py-3.5 px-4 font-label-caps text-label-caps tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm active:bg-primary font-bold cursor-pointer"
              >
                <Icon name="bolt" size={16} />
                TRACK ORDER STATUS
              </Link>
              <button
                type="button"
                onClick={handleWhatsAppAlerts}
                className="flex-1 bg-primary text-on-primary py-3 px-4 font-label-caps text-label-caps tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm active:opacity-90 font-bold cursor-pointer"
              >
                <Icon name="phone" size={16} />
                WHATSAPP ORDER UPDATES
              </button>
              <Link
                href="/shop"
                className="flex-1 bg-surface-container-high text-on-surface py-3 px-4 font-label-caps text-label-caps tracking-widest uppercase flex items-center justify-center gap-2 active:bg-surface-container-highest font-bold cursor-pointer"
              >
                <Icon name="arrow_back" size={16} />
                CONTINUE SHOPPING
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3">
              <div className="bg-surface-container-low p-2.5 flex flex-col items-center text-center border border-outline-variant/10">
                <Icon name="verified" size={20} className="text-primary-container mb-1" />
                <span className="font-ticker-item text-ticker-item text-on-surface uppercase font-bold">
                  100% AUTHENTIC
                </span>
                <span className="font-body-sm text-[0.625rem] text-on-surface-variant leading-tight mt-0.5">
                  Drop Guaranteed
                </span>
              </div>
              <div className="bg-surface-container-low p-2.5 flex flex-col items-center text-center border border-outline-variant/10">
                <Icon name="sync_alt" size={20} className="text-primary-container mb-1" />
                <span className="font-ticker-item text-ticker-item text-on-surface uppercase font-bold">
                  7-DAY FREE
                </span>
                <span className="font-body-sm text-[0.625rem] text-on-surface-variant leading-tight mt-0.5">
                  Size Exchange
                </span>
              </div>
              <div className="bg-surface-container-low p-2.5 flex flex-col items-center text-center border border-outline-variant/10">
                <Icon name="phone" size={20} className="text-primary-container mb-1" />
                <span className="font-ticker-item text-ticker-item text-on-surface uppercase font-bold">
                  24/7 CONCIERGE
                </span>
                <span className="font-body-sm text-[0.625rem] text-on-surface-variant leading-tight mt-0.5">
                  Priority Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
