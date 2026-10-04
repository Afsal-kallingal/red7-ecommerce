'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { api } from '@/services/api';
import { FyndImage } from '@/components/ui/FyndImage';
import { formatINR } from '@/lib/utils';
import { PaymentMethodType, UpiApp } from '@/types/checkout';
import { ShippingAddress } from '@/types/order';
import { Icon } from '@/components/ui/Icon';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, getSubtotal, appliedCoupon, clearCart } = useCartStore();
  const { showToast } = useUIStore();

  const total = getTotal() || 399.00;
  const subtotal = getSubtotal() || 399.00;

  // Selected item (either first cart item or fallback default matching Stitch)
  const mainItem = items[0] || {
    id: 'prod-rm-away-green-M',
    productId: 'prod-rm-away-green',
    slug: 'real-madrid-2026-27-away-kit-green-bellingham',
    title: 'Real Madrid Away Bellingham #5',
    subtitle: 'Green // Bellingham #5',
    price: 399.00,
    originalPrice: 2499.00,
    size: 'M (UK/IN 40")',
    quantity: 1,
    image: {
      id: 'rm-away-1',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzcmsAlpk2EEW-7inr9qGtzJU_DovpJMQdbmX2oT_ecB_Q7HzRHnmo3HUvue-tB0-433YakMkHYSbjw9zqVdjWHEbyrRGFjhaFSApvGUBzRx8D-ogyGv1gw_2vQFjwrDXdpumkzk0QPHxcLkFUbzPrOfeG15y5A1E5ZgkdUVMqn5XEQV5BjGUpOmS4YVgfNhKVlU4fhnYmbIpGYBgPMM2rgzgvUMwGrsLUKgA7hCht-rxcEEy0A37zPQ',
      alt: 'Real Madrid Away Bellingham',
    },
  };

  // Payment states
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('upi_intent');
  const [selectedUpiApp, setSelectedUpiApp] = useState<UpiApp>('gpay');
  const [upiVpa, setUpiVpa] = useState('');
  const [vpaVerified, setVpaVerified] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Countdown timer: 07:42
  const [timerSeconds, setTimerSeconds] = useState(462);

  // Address state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Rohan Sen',
    phone: '+91 98765 43210',
    email: 'rohan.sen@example.com',
    addressLine1: 'Flat 402, Terrace Court, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Processing Overlay Modal
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('Routing UPI Intent...');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectUPI = (app: UpiApp) => {
    setSelectedMethod('upi_intent');
    setSelectedUpiApp(app);
    setActiveAccordion(null);
  };

  const handleVerifyVpa = () => {
    if (upiVpa.includes('@') && upiVpa.length > 5) {
      setVpaVerified(true);
      setSelectedMethod('upi_vpa');
      showToast('UPI VPA Verified Successfully!');
    } else {
      showToast('Please enter a valid UPI ID (e.g. mobile@okhdfcbank)');
    }
  };

  const executeOrderSubmission = async () => {
    setIsProcessing(true);
    setProcessingStatus(
      selectedMethod === 'upi_intent'
        ? `Launching ${selectedUpiApp.toUpperCase()} Gateway...`
        : 'Authorizing Transaction...'
    );

    setTimeout(() => {
      setProcessingStatus('Verifying 256-Bit Bank Token...');
    }, 1000);

    setTimeout(async () => {
      setProcessingStatus('Order Reserved! Allocating Drop...');
      try {
        const orderItems = items.length > 0 ? items : [mainItem];
        const newOrder = await api.createOrder(
          {
            customer: {
              fullName: address.fullName,
              phone: address.phone,
              email: address.email || '',
            },
            shippingAddress: address,
            paymentMethod: selectedMethod,
            upiApp: selectedUpiApp,
            upiVpa: upiVpa || undefined,
            couponCode: appliedCoupon || undefined,
          },
          orderItems,
          total
        );

        clearCart();
        router.push(`/order-confirmation/${newOrder.allocationId.replace('#', '')}`);
      } catch (e) {
        console.error(e);
        setIsProcessing(false);
        showToast('Payment processing error. Please try again.');
      }
    }, 2200);
  };

  return (
    <>
      {/* Checkout Header */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/10">
        <div className="max-w-6xl mx-auto h-16 px-margin md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              aria-label="Go Back"
              onClick={() => router.back()}
              className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <Icon name="arrow_back" size={20} />
            </button>
            <div className="flex flex-col">
              <span className="font-headline text-lg uppercase tracking-wider text-black leading-none font-black">
                RED<span className="text-[#e50914]">7</span>
              </span>
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                Payment Method
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            <div className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 border border-outline-variant/20">
              <Icon name="lock" size={14} className="text-primary" />
              <span className="font-ticker-item text-ticker-item text-on-surface-variant uppercase font-bold">
                256-Bit SSL
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-16">
          {/* Progress & Drop Ticker */}
          <div className="w-full bg-primary-container text-on-primary-container px-margin py-space-xs flex items-center justify-between shadow-xs">
            <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse" />
                <span className="font-ticker-item text-ticker-item uppercase text-surface-bright tracking-wider">
                  DROP RESERVATION: {formatTimer(timerSeconds)} REMAINING
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-tertiary-fixed tracking-widest uppercase font-bold">
                STEP 3/3
              </span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto w-full p-margin md:p-6 flex flex-col gap-space-md">
            {/* Header Title */}
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest font-bold">
                  FINAL AUTHENTICATION
                </span>
              </div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase text-on-surface tracking-tight leading-none mt-1 font-bold">
                SECURE CHECKOUT - STEP 3/3: PAYMENT
              </h1>
            </div>

            {/* Desktop Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Shipping Address & Payment Modules (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-space-md">
                {/* Shipping Destination Strip */}
                <div className="bg-surface-container-lowest p-space-md shadow-xs border border-outline-variant/20 flex flex-col gap-1 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps uppercase text-on-surface font-bold tracking-wider">
                      SHIPPING TO
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(!isEditingAddress)}
                      className="font-ticker-item uppercase text-primary font-bold hover:underline cursor-pointer"
                    >
                      {isEditingAddress ? 'SAVE' : 'CHANGE'}
                    </button>
                  </div>

                  {isEditingAddress ? (
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="p-2 bg-surface-container-low text-xs border border-outline-variant/30"
                      />
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        placeholder="Mobile (+91)"
                        className="p-2 bg-surface-container-low text-xs border border-outline-variant/30"
                      />
                      <input
                        type="text"
                        value={address.addressLine1}
                        onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                        placeholder="Street Address"
                        className="p-2 bg-surface-container-low text-xs border border-outline-variant/30"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          placeholder="City"
                          className="p-2 bg-surface-container-low text-xs border border-outline-variant/30"
                        />
                        <input
                          type="text"
                          value={address.pincode}
                          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                          placeholder="PIN Code"
                          className="p-2 bg-surface-container-low text-xs border border-outline-variant/30"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-1">
                      <span className="font-headline-sm uppercase text-on-surface font-bold text-sm block">
                        {address.fullName} • {address.phone}
                      </span>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">
                        {address.addressLine1}, {address.city}, {address.state} – {address.pincode}
                      </p>
                    </div>
                  )}
                </div>

                {/* Primary Payment Module: UPI */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm uppercase text-on-surface font-bold">
                        PAY VIA UPI
                      </span>
                      <span className="bg-primary-container text-on-primary-container px-2 py-0.5 font-label-caps uppercase tracking-wider flex items-center gap-1 font-bold text-[11px]">
                        <Icon name="bolt" size={12} className="text-tertiary-fixed fill-current" />
                        RECOMMENDED
                      </span>
                    </div>
                    <span className="font-ticker-item uppercase text-surface-tint font-bold">
                      0% GATEWAY FEE
                    </span>
                  </div>

                  {/* UPI App Intent Matrix (2x2) */}
                  <div className="grid grid-cols-2 gap-space-xs mt-1">
                    {/* GPay */}
                    <button
                      type="button"
                      onClick={() => handleSelectUPI('gpay')}
                      className={`text-left p-space-sm bg-surface-container-lowest shadow-xs flex flex-col justify-between transition-all duration-150 active:scale-[0.98] relative border cursor-pointer ${
                        selectedMethod === 'upi_intent' && selectedUpiApp === 'gpay'
                          ? 'border-primary ring-1 ring-primary'
                          : 'border-outline-variant/20'
                      }`}
                    >
                      {selectedMethod === 'upi_intent' && selectedUpiApp === 'gpay' && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center">
                          <Icon name="check" size={10} />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-headline-sm">
                          <Icon name="credit_card" size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-headline-sm uppercase tracking-wide text-on-surface leading-none font-bold">
                            GPAY
                          </span>
                          <span className="font-ticker-item uppercase text-on-surface-variant mt-0.5 text-[10px]">
                            GOOGLE PAY
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-1.5 flex items-center justify-between bg-surface-container-low px-1.5 py-0.5">
                        <span className="font-ticker-item text-primary font-bold tracking-tight text-[10px]">
                          FASTEST INTENT
                        </span>
                        <Icon name="arrow_forward" size={12} className="text-primary" />
                      </div>
                    </button>

                    {/* PhonePe */}
                    <button
                      type="button"
                      onClick={() => handleSelectUPI('phonepe')}
                      className={`text-left p-space-sm bg-surface-container-lowest shadow-xs flex flex-col justify-between transition-all duration-150 active:scale-[0.98] relative border cursor-pointer ${
                        selectedMethod === 'upi_intent' && selectedUpiApp === 'phonepe'
                          ? 'border-primary ring-1 ring-primary'
                          : 'border-outline-variant/20'
                      }`}
                    >
                      {selectedMethod === 'upi_intent' && selectedUpiApp === 'phonepe' && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center">
                          <Icon name="check" size={10} />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed font-headline-sm">
                          <Icon name="phone" size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-headline-sm uppercase tracking-wide text-on-surface leading-none font-bold">
                            PHONEPE
                          </span>
                          <span className="font-ticker-item uppercase text-on-surface-variant mt-0.5 text-[10px]">
                            DIRECT BANK
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-1.5 flex items-center justify-between bg-surface-container-low px-1.5 py-0.5">
                        <span className="font-ticker-item text-on-surface-variant tracking-tight font-bold text-[10px]">
                          ALL BANKS
                        </span>
                        <Icon name="arrow_forward" size={12} className="text-on-surface-variant" />
                      </div>
                    </button>

                    {/* Paytm */}
                    <button
                      type="button"
                      onClick={() => handleSelectUPI('paytm')}
                      className={`text-left p-space-sm bg-surface-container-lowest shadow-xs flex flex-col justify-between transition-all duration-150 active:scale-[0.98] relative border cursor-pointer ${
                        selectedMethod === 'upi_intent' && selectedUpiApp === 'paytm'
                          ? 'border-primary ring-1 ring-primary'
                          : 'border-outline-variant/20'
                      }`}
                    >
                      {selectedMethod === 'upi_intent' && selectedUpiApp === 'paytm' && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center">
                          <Icon name="check" size={10} />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-headline-sm">
                          <Icon name="credit_card" size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-headline-sm uppercase tracking-wide text-on-surface leading-none font-bold">
                            PAYTM
                          </span>
                          <span className="font-ticker-item uppercase text-on-surface-variant mt-0.5 text-[10px]">
                            WALLET / UPI
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-1.5 flex items-center justify-between bg-surface-container-low px-1.5 py-0.5">
                        <span className="font-ticker-item text-on-surface-variant tracking-tight font-bold text-[10px]">
                          ONE CLICK
                        </span>
                        <Icon name="arrow_forward" size={12} className="text-on-surface-variant" />
                      </div>
                    </button>

                    {/* BHIM / Any */}
                    <button
                      type="button"
                      onClick={() => handleSelectUPI('bhim')}
                      className={`text-left p-space-sm bg-surface-container-lowest shadow-xs flex flex-col justify-between transition-all duration-150 active:scale-[0.98] relative border cursor-pointer ${
                        selectedMethod === 'upi_intent' && selectedUpiApp === 'bhim'
                          ? 'border-primary ring-1 ring-primary'
                          : 'border-outline-variant/20'
                      }`}
                    >
                      {selectedMethod === 'upi_intent' && selectedUpiApp === 'bhim' && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center">
                          <Icon name="check" size={10} />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-headline-sm">
                          <Icon name="qr_code" size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-headline-sm uppercase tracking-wide text-on-surface leading-none font-bold">
                            BHIM / ANY
                          </span>
                          <span className="font-ticker-item uppercase text-on-surface-variant mt-0.5 text-[10px]">
                            NPCI NETWORK
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-1.5 flex items-center justify-between bg-surface-container-low px-1.5 py-0.5">
                        <span className="font-ticker-item text-on-surface-variant tracking-tight font-bold text-[10px]">
                          UNIVERSAL
                        </span>
                        <Icon name="arrow_forward" size={12} className="text-on-surface-variant" />
                      </div>
                    </button>
                  </div>

                  {/* VPA Manual Fallback Form */}
                  <div className="mt-2 bg-surface-container-lowest p-space-md shadow-xs border border-outline-variant/20 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="upi-vpa-input"
                        className="font-label-caps text-label-caps uppercase text-on-surface font-bold tracking-wider"
                      >
                        OR ENTER UPI ID / VPA
                      </label>
                      <span className="font-ticker-item text-ticker-item text-on-surface-variant">
                        e.g. mobile@okhdfcbank
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <input
                          id="upi-vpa-input"
                          type="text"
                          value={upiVpa}
                          onChange={(e) => setUpiVpa(e.target.value)}
                          placeholder="username@upi"
                          className="w-full bg-surface-container-low px-3 py-2.5 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                        />
                        {vpaVerified && (
                          <Icon
                            name="check_circle"
                            size={18}
                            className="absolute right-2.5 top-3 text-green-600"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyVpa}
                        className="bg-surface-container-highest text-on-surface px-4 py-2.5 font-label-caps text-label-caps uppercase tracking-wider shrink-0 active:scale-95 transition-all font-bold cursor-pointer"
                      >
                        VERIFY
                      </button>
                    </div>
                  </div>
                </div>

                {/* Secondary Payment Methods Accordion */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <span className="font-label-caps uppercase text-on-surface-variant tracking-wider font-bold">
                    OTHER PAYMENT METHODS
                  </span>

                  {/* Card Accordion */}
                  <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/20 overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveAccordion(activeAccordion === 'card' ? null : 'card')
                      }
                      className="w-full p-space-md flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon name="credit_card" size={20} className="text-primary" />
                        <div className="flex flex-col">
                          <span className="font-headline-sm uppercase text-on-surface leading-none font-bold">
                            CREDIT / DEBIT CARD
                          </span>
                          <span className="font-ticker-item uppercase text-on-surface-variant mt-0.5">
                            VISA, MASTERCARD, RUPAY
                          </span>
                        </div>
                      </div>
                      <Icon
                        name="expand_more"
                        size={18}
                        className={`text-on-surface-variant transition-transform duration-200 ${
                          activeAccordion === 'card' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeAccordion === 'card' && (
                      <div className="px-space-md pb-space-md pt-0 bg-surface-container-low flex flex-col gap-2">
                        <p className="font-body-sm text-on-surface-variant mt-2">
                          Card verification runs via 3D-Secure 2.0 with instant OTP authentication.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedMethod('card');
                            executeOrderSubmission();
                          }}
                          className="w-full py-2.5 bg-secondary text-on-secondary font-label-caps uppercase tracking-wider font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
                        >
                          ENTER CARD DETAILS • {formatINR(total)}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Cash On Delivery (COD) */}
                  <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/20 overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveAccordion(activeAccordion === 'cod' ? null : 'cod')
                      }
                      className="w-full p-space-md flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon name="local_shipping" size={20} className="text-secondary" />
                        <div className="flex flex-col">
                          <span className="font-headline-sm uppercase text-on-surface leading-none font-bold">
                            CASH ON DELIVERY (COD)
                          </span>
                          <span className="font-ticker-item uppercase text-on-surface-variant mt-0.5">
                            VERIFY OTP UPON DELIVERY
                          </span>
                        </div>
                      </div>
                      <Icon
                        name="expand_more"
                        size={18}
                        className={`text-on-surface-variant transition-transform duration-200 ${
                          activeAccordion === 'cod' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeAccordion === 'cod' && (
                      <div className="px-space-md pb-space-md pt-0 bg-surface-container-low flex flex-col gap-2">
                        <p className="font-body-sm text-on-surface-variant mt-2">
                          Cash on Delivery is available for Indiranagar, Bengaluru. Zero surcharge.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedMethod('cod');
                            executeOrderSubmission();
                          }}
                          className="w-full py-2.5 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
                        >
                          CONFIRM COD ORDER • {formatINR(total)}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary Ticket & Pay Button (5 cols on desktop) */}
              <div className="md:col-span-5 md:sticky md:top-24 flex flex-col gap-space-md">
                {/* Order Summary Ticket (Editorial Flat Card) */}
                <div className="bg-surface-container-lowest p-space-md shadow-xs relative overflow-hidden border border-outline-variant/20">
                  <div className="flex items-start gap-space-md pb-space-sm">
                    <div className="w-20 h-24 bg-surface-container-high shrink-0 overflow-hidden relative shadow-xs">
                      <FyndImage
                        src={mainItem.image}
                        alt={mainItem.title}
                        fallbackType="kit"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-primary px-1.5 py-0.5">
                        <span className="font-ticker-item text-ticker-item uppercase text-on-primary">
                          AUTH DROP
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-label-caps text-label-caps text-surface-tint uppercase tracking-wider font-bold">
                            RM 26/27 SPECIAL
                          </span>
                          <span className="font-ticker-item text-ticker-item bg-secondary-container text-on-secondary-fixed px-1.5 py-0.5 uppercase font-bold">
                            VERIFIED
                          </span>
                        </div>
                        <h2 className="font-headline-sm text-headline-sm uppercase text-on-surface truncate mt-0.5 font-bold">
                          {mainItem.title}
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Size: <strong className="text-on-surface">{mainItem.size}</strong> • Qty:{' '}
                          <strong className="text-on-surface">{mainItem.quantity}</strong>
                        </p>
                      </div>

                      <div className="flex items-baseline gap-space-xs mt-2">
                        <span className="font-price-current text-price-current text-on-surface">
                          {formatINR(mainItem.price * mainItem.quantity)}
                        </span>
                        {mainItem.originalPrice && (
                          <span className="font-price-original text-price-original text-outline line-through">
                            {formatINR(mainItem.originalPrice * mainItem.quantity)}
                          </span>
                        )}
                        <span className="font-label-caps text-label-caps text-error ml-auto font-bold">
                          84% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Itemized Receipt */}
                  <div className="mt-space-xs pt-space-xs flex flex-col gap-1.5 bg-surface-container-low p-2.5 border border-outline-variant/10">
                    <div className="flex justify-between items-center text-body-sm">
                      <span className="text-on-surface-variant">Cart Subtotal</span>
                      <span className="font-body-md text-on-surface">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-body-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-on-surface-variant font-body-sm">
                          Express Terrace Delivery
                        </span>
                        <span className="bg-primary text-on-primary font-ticker-item text-[10px] px-1 py-0.2 uppercase font-bold">
                          FREE
                        </span>
                      </div>
                      <span className="font-body-md text-surface-tint font-bold">₹0.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5 mt-0.5 bg-surface-container-highest px-2 py-1.5 border border-outline-variant/20">
                      <span className="font-label-caps text-label-caps uppercase text-on-surface font-bold tracking-wider">
                        TOTAL PAYABLE
                      </span>
                      <span className="font-headline-md text-headline-md text-primary font-bold">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div>
                  <button
                    type="button"
                    onClick={executeOrderSubmission}
                    className="w-full h-14 bg-primary text-on-primary font-headline-sm uppercase tracking-wider font-bold shadow-lg hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      PAY {formatINR(total)} VIA{' '}
                      {selectedMethod === 'upi_intent'
                        ? selectedUpiApp.toUpperCase()
                        : selectedMethod.toUpperCase()}
                    </span>
                    <Icon name="lock" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Processing Simulation Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="w-16 h-16 rounded-full bg-primary-container border-2 border-primary-fixed flex items-center justify-center mb-4">
            <Icon name="refresh" size={32} className="animate-spin text-tertiary-fixed" />
          </div>
          <h3 className="font-headline-md uppercase tracking-wider text-xl font-bold">
            {processingStatus}
          </h3>
          <p className="font-body-sm text-surface-container-highest/80 mt-2 max-w-xs">
            Connecting to NPCI Unified Payments Interface. Do not press back or refresh.
          </p>
        </div>
      )}
    </>
  );
}
