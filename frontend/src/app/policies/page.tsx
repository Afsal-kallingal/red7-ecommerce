'use client';

import React, { useState } from 'react';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState<'returns' | 'shipping' | 'privacy' | 'terms'>('returns');

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="px-margin pt-space-md pb-space-lg flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="font-headline-lg-mobile uppercase text-on-surface font-bold tracking-tight">
              POLICIES & GUARANTEES
            </h1>
            <p className="font-body-sm text-on-surface-variant mt-0.5">
              Transparent, fan-first assurances backing every terrace release.
            </p>
          </div>

          {/* Policy Tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-none py-1 border-b border-outline-variant/20">
            <button
              type="button"
              onClick={() => setActiveTab('returns')}
              className={`px-3 py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
                activeTab === 'returns'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              7-Day Exchange
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`px-3 py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
                activeTab === 'shipping'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Express Shipping
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 font-label-caps text-xs uppercase tracking-wider font-bold transition-colors ${
                activeTab === 'terms'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Terms of Drop
            </button>
          </div>

          {/* Policy Content */}
          <div className="bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-sm text-on-surface-variant font-body-sm text-xs leading-relaxed flex flex-col gap-3">
            {activeTab === 'returns' && (
              <>
                <h3 className="font-headline-sm uppercase text-on-surface font-bold text-sm">
                  7-Day Doorstep Size Replacement Policy
                </h3>
                <p>
                  At FYND, we want your matchday kit to fit with razor-sharp terrace perfection. If your ordered kit is either too snug or too relaxed, you can exchange it within 7 days of package delivery.
                </p>
                <div className="bg-surface-container-low p-3 border-l-2 border-primary my-1 flex flex-col gap-1">
                  <strong className="text-on-surface">Zero Pickup Charges:</strong>
                  <span>
                    Our logistics partner will collect the original piece directly from your doorstep with no additional fee.
                  </span>
                </div>
                <p>
                  Condition requirement: Kits must be in unworn, unwashed condition with original tags and packaging intact.
                </p>
              </>
            )}

            {activeTab === 'shipping' && (
              <>
                <h3 className="font-headline-sm uppercase text-on-surface font-bold text-sm">
                  Express Pan-India Logistics & Cash On Delivery
                </h3>
                <p>
                  We partner directly with Bluedart Air and Delhivery Priority to guarantee swift transport across all 19,000+ serviceable Indian postal PIN codes.
                </p>
                <ul className="list-disc pl-4 space-y-1 my-1">
                  <li>Dispatched within 24 to 48 hours from our Indiranagar fulfillment vault.</li>
                  <li>Metro hubs arrive in 2 to 3 business days.</li>
                  <li>Rest of India destinations arrive in 3 to 5 business days.</li>
                </ul>
                <p>
                  Cash on Delivery (COD) is available on all eligible orders with no hidden extra surcharges.
                </p>
              </>
            )}

            {activeTab === 'privacy' && (
              <>
                <h3 className="font-headline-sm uppercase text-on-surface font-bold text-sm">
                  Privacy & Data Encryption Notice
                </h3>
                <p>
                  We treat customer privacy with the utmost seriousness. Your phone numbers, email addresses, and shipping destinations are encrypted via 256-bit SSL protocols and are solely utilized to coordinate logistics, dispatch tracking SMS, and WhatsApp alerts.
                </p>
                <p>
                  We never store financial card credentials or UPI PIN numbers. All payment authorization transactions are securely routed through NPCI-licensed payment aggregators.
                </p>
              </>
            )}

            {activeTab === 'terms' && (
              <>
                <h3 className="font-headline-sm uppercase text-on-surface font-bold text-sm">
                  Terms of Drop & Allocation
                </h3>
                <p>
                  Due to the limited-batch nature of our seasonal football drops and street apparel editions, orders are locked on a first-come, first-served allocation basis. Placing an order reserves the stock in our vault under your unique Allocation ID.
                </p>
                <p>
                  Prices are inclusive of all statutory GST taxes and complimentary transit insurance against postal damage.
                </p>
              </>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
