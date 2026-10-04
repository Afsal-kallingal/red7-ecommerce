'use client';

import React, { useState } from 'react';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { Icon } from '@/components/ui/Icon';
import { useUIStore } from '@/store/uiStore';

export default function ContactPage() {
  const { showToast } = useUIStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been dispatched to our concierge team.');
    setName('');
    setEmail('');
    setOrderId('');
    setMessage('');
  };

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="font-headline-lg-mobile md:text-3xl uppercase text-on-surface font-bold tracking-tight">
              CLIENT CONCIERGE & SUPPORT
            </h1>
            <p className="font-body-sm text-on-surface-variant mt-1 text-sm md:text-base">
              Available 7 days a week for matchday logistics, sizing inquiries, and order updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick WhatsApp Card */}
            <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-6 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#128C7E] mb-2">
                  <Icon name="chat" size={24} />
                  <span className="font-headline-sm uppercase font-bold text-sm md:text-base">
                    FASTEST RESPONSE: DIRECT WHATSAPP
                  </span>
                </div>
                <p className="font-body-sm text-xs md:text-sm text-on-surface leading-relaxed">
                  Skip email waiting times. Connect with our dedicated terrace concierge directly on WhatsApp for real-time order tracking and sizing consultation.
                </p>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hi%20FYND%20Concierge,%20inquiring%20about%20my%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start px-6 py-3 bg-[#25D366] text-white font-label-caps uppercase tracking-wider font-bold shadow-sm hover:brightness-105 active:scale-95 transition-all inline-flex items-center gap-2 text-xs md:text-sm"
              >
                <span>Chat on WhatsApp</span>
                <Icon name="arrow_forward" size={16} />
              </a>
            </div>

            {/* Support Info Cards */}
            <div className="flex flex-col gap-4">
              <div className="bg-surface-container-low p-5 border border-outline-variant/10 flex flex-col gap-1.5">
                <span className="font-label-caps uppercase text-primary font-bold text-xs tracking-wider">DISPATCH HUB</span>
                <p className="text-on-surface-variant font-body-sm text-xs md:text-sm">
                  FYND Logistics Terminal, Indiranagar, Bengaluru, KA 560038
                </p>
              </div>
              <div className="bg-surface-container-low p-5 border border-outline-variant/10 flex flex-col gap-1.5">
                <span className="font-label-caps uppercase text-primary font-bold text-xs tracking-wider">HOURS</span>
                <p className="text-on-surface-variant font-body-sm text-xs md:text-sm">
                  Monday – Sunday: 9:00 AM – 9:00 PM IST
                </p>
              </div>
              <div className="bg-surface-container-low p-5 border border-outline-variant/10 flex flex-col gap-1.5">
                <span className="font-label-caps uppercase text-primary font-bold text-xs tracking-wider">DIRECT EMAIL</span>
                <p className="text-on-surface-variant font-body-sm text-xs md:text-sm">
                  drops@fyndterrace.in
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-surface-container-lowest p-6 border border-outline-variant/20 shadow-sm flex flex-col gap-4"
          >
            <span className="font-label-caps uppercase text-on-surface font-bold text-sm md:text-base">
              SEND AN INQUIRY
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 bg-surface-container-low text-sm border border-outline-variant/30 font-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-surface-container-low text-sm border border-outline-variant/30 font-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <input
              type="text"
              placeholder="Order / Allocation ID (Optional e.g. #FYND-88291)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="p-3 bg-surface-container-low text-sm border border-outline-variant/30 font-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              required
              rows={4}
              placeholder="How can we assist you with your kit drop?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 bg-surface-container-low text-sm border border-outline-variant/30 font-body-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <button
              type="submit"
              className="py-3 px-8 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm hover:bg-primary-container active:scale-95 transition-all self-start"
            >
              Dispatch Inquiry
            </button>
          </form>
        </div>
        <Footer />
      </main>
    </>
  );
}
