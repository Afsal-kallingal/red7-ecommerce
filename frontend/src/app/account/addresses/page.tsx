'use client';

import React, { useState } from 'react';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { useUIStore } from '@/store/uiStore';
import { ShippingAddress } from '@/types/order';

export default function AddressesPage() {
  const { showToast } = useUIStore();
  const [addresses, setAddresses] = useState<ShippingAddress[]>([
    {
      fullName: 'Rohan Sen',
      phone: '+91 98765 43210',
      email: 'rohan.sen@example.com',
      addressLine1: 'Flat 402, Terrace Court, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
    {
      fullName: 'Rohan Sen (Office)',
      phone: '+91 98765 43210',
      email: 'rohan.sen@example.com',
      addressLine1: 'FYND Studios, 100ft Road, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newAddr, setNewAddr] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.pincode) return;
    setAddresses([...addresses, newAddr]);
    setIsAdding(false);
    showToast('New delivery address added');
    setNewAddr({ fullName: '', phone: '', addressLine1: '', city: '', state: '', pincode: '' });
  };

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="px-margin pt-space-md pb-space-lg flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <h1 className="font-headline-lg-mobile uppercase text-on-surface font-bold tracking-tight">
              DELIVERY DESTINATIONS
            </h1>
            <button
              type="button"
              onClick={() => setIsAdding(!isAdding)}
              className="px-3 py-1 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold text-xs"
            >
              {isAdding ? 'CANCEL' : '+ ADD NEW'}
            </button>
          </div>

          {isAdding && (
            <form
              onSubmit={handleSave}
              className="bg-surface-container-lowest p-4 border border-outline-variant/20 shadow-sm flex flex-col gap-3"
            >
              <span className="font-label-caps uppercase text-on-surface font-bold">
                NEW DESTINATION FORM
              </span>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={newAddr.fullName}
                onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                className="p-2.5 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
              />
              <input
                type="tel"
                required
                placeholder="Contact Mobile (+91)"
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="p-2.5 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
              />
              <input
                type="text"
                required
                placeholder="Street Address & Flat / House No."
                value={newAddr.addressLine1}
                onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                className="p-2.5 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="p-2.5 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
                />
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="p-2.5 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
                />
              </div>
              <input
                type="tel"
                maxLength={6}
                required
                placeholder="6-Digit Indian PIN Code"
                value={newAddr.pincode}
                onChange={(e) =>
                  setNewAddr({ ...newAddr, pincode: e.target.value.replace(/\D/g, '') })
                }
                className="p-2.5 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
              />
              <button
                type="submit"
                className="py-3 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm"
              >
                Save Destination
              </button>
            </form>
          )}

          <div className="flex flex-col gap-3">
            {addresses.map((addr, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-4 border border-outline-variant/20 shadow-sm flex flex-col gap-1 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm uppercase text-on-surface font-bold text-sm">
                    {addr.fullName}
                  </span>
                  {idx === 0 && (
                    <span className="bg-primary-container text-on-primary-fixed font-label-caps text-[10px] px-2 py-0.5 uppercase font-bold">
                      DEFAULT
                    </span>
                  )}
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                  {addr.addressLine1}
                  <br />
                  {addr.city}, {addr.state} – {addr.pincode}
                </p>
                <span className="font-body-sm text-xs text-on-surface-variant font-medium mt-1">
                  {addr.phone}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
