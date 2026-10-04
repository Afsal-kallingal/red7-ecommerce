'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Product, KitSize } from '@/types/product';
import { PincodeCheckResult } from '@/types/checkout';
import { FyndImage } from '@/components/ui/FyndImage';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatINR } from '@/lib/utils';
import { Footer } from '@/components/storefront/Footer';
import { Icon } from '@/components/ui/Icon';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const slug = resolvedParams.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<KitSize>('M');
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('560001');
  const [pincodeResult, setPincodeResult] = useState<PincodeCheckResult | null>(null);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { addItem, getItemCount } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast } = useUIStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function load() {
      const data = await api.getProductBySlug(slug);
      if (data) {
        setProduct(data);
        if (data.sizes.length > 0) {
          const defaultSz = data.sizes.find((s) => s.size === 'M') || data.sizes[0];
          setSelectedSize(defaultSz.size);
        }
      }
    }
    load();
  }, [slug]);

  useEffect(() => {
    // Initial verification of default Indian PIN code
    api.checkPincode('560001').then(setPincodeResult);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Icon name="refresh" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const totalCartCount = getItemCount();

  const handlePincodeCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = await api.checkPincode(pincode);
    setPincodeResult(res);
    if (res.serviceable) {
      showToast(`Express Delivery available for PIN ${res.pincode}`);
    }
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id);
    showToast(
      added ? `Saved ${product.shortTitle} to Wishlist` : 'Removed from Wishlist',
      'VIEW',
      '/wishlist'
    );
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      subtitle: `${selectedSize} • ${product.subtitle}`,
      price: product.price,
      originalPrice: product.originalPrice,
      size: selectedSize,
      quantity,
      image: product.primaryImage,
    });
    showToast(`${product.shortTitle} (${selectedSize}) added to bag`, 'VIEW BAG', '/cart');
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      subtitle: `${selectedSize} • ${product.subtitle}`,
      price: product.price,
      originalPrice: product.originalPrice,
      size: selectedSize,
      quantity,
      image: product.primaryImage,
    });
    router.push('/checkout');
  };

  const galleryImages = product.gallery.length > 0 ? product.gallery : [product.primaryImage];
  const activeMedia = galleryImages[activeSlide] || product.primaryImage;

  return (
    <>
      {/* PDP Top Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-outline-variant/10">
        <div className="max-w-6xl mx-auto h-14 px-margin md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              aria-label="Go Back"
              onClick={() => router.back()}
              className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <Icon name="arrow_back" size={20} />
            </button>
            <h1 className="font-headline-md text-headline-md uppercase tracking-wider text-on-surface truncate max-w-[200px] md:max-w-none">
              Product Detail
            </h1>
          </div>
          <div className="flex items-center gap-space-xs">
            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
            >
              <Icon name="shopping_bag" size={20} />
              {mounted && totalCartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-primary text-on-primary font-headline-sm text-[10px] leading-[18px] rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-col relative w-full pt-14 bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-32 md:pb-12">
          {/* Scrolling Promotional Marquee Strip */}
          <div className="w-full bg-surface-container-highest overflow-hidden py-2 select-none shadow-xs border-b border-outline-variant/20">
            <div className="flex items-center gap-space-md whitespace-nowrap animate-marquee px-space-sm">
              <span className="font-ticker-item text-ticker-item text-on-surface uppercase tracking-wider">
                LIMITED DROP // 26/27 OFFICIAL REPLICA
              </span>
              <span className="text-on-surface-variant">•</span>
              <span className="font-ticker-item text-ticker-item text-primary font-bold uppercase tracking-wider">
                PAN-INDIA EXPRESS SHIPPING 48H
              </span>
              <span className="text-on-surface-variant">•</span>
              <span className="font-ticker-item text-ticker-item text-on-surface uppercase tracking-wider">
                BUY 2 GET EXTRA ₹100 OFF: CODE "MADRIDISTA"
              </span>
              <span className="text-on-surface-variant">•</span>
            </div>
          </div>

          {/* Responsive 2-column Container */}
          <div className="max-w-6xl mx-auto w-full px-margin md:px-6 pt-space-md">
            {/* Breadcrumbs & Category Tag */}
            <div className="pb-space-sm flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                <Link href="/shop" className="hover:text-primary transition-colors">
                  {product.league || 'La Liga'}
                </Link>
                <span>/</span>
                <Link
                  href={`/shop?club=${encodeURIComponent(product.club || '')}`}
                  className="hover:text-primary transition-colors"
                >
                  {product.club || 'Club'}
                </Link>
                <span>/</span>
                <span className="text-on-surface font-semibold truncate max-w-[140px] md:max-w-none">
                  {product.shortTitle}
                </span>
              </div>
              <span className="bg-primary-container text-on-primary-fixed font-label-caps text-label-caps px-2 py-0.5 uppercase tracking-widest font-bold">
                {product.dropTag || 'DROP VERIFIED'}
              </span>
            </div>

            {/* Main Product Layout: Split on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column: Photo Gallery */}
              <section aria-label="Product Images" className="relative w-full flex flex-col md:sticky md:top-20">
                <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden group shadow-sm rounded-none md:rounded-lg">
                  <FyndImage
                    src={activeMedia}
                    alt={activeMedia.alt || product.title}
                    fallbackType="kit"
                    fill
                    priority
                    className="object-cover transition-transform duration-500 ease-out"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.badge && (
                      <span className="bg-error text-on-error font-label-caps text-label-caps px-2.5 py-1 uppercase tracking-wider font-bold shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <span className="bg-inverse-surface text-inverse-on-surface font-label-caps text-label-caps px-2 py-0.5 uppercase tracking-wide">
                      PLAYER EDITION CUT
                    </span>
                  </div>

                  {/* Slide Counter Pill */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                    <div className="pointer-events-auto bg-inverse-surface/85 backdrop-blur-md px-2.5 py-1 text-inverse-on-surface font-label-caps text-label-caps font-bold tracking-wider">
                      <span>{activeSlide + 1}</span> / {galleryImages.length}
                    </div>

                    <div className="flex items-center gap-1.5 pointer-events-auto bg-surface/80 backdrop-blur-md px-2 py-1">
                      {galleryImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          aria-label={`Slide ${idx + 1}`}
                          onClick={() => setActiveSlide(idx)}
                          className={`rounded-full transition-all cursor-pointer ${
                            activeSlide === idx
                              ? 'w-2 h-2 bg-primary'
                              : 'w-1.5 h-1.5 bg-outline-variant'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gallery Thumbnail Mini Grid */}
                <div className="grid grid-cols-4 gap-gutter mt-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`aspect-square bg-surface-container-low overflow-hidden border-2 transition-all relative cursor-pointer rounded-xs ${
                        activeSlide === idx ? 'border-primary' : 'border-transparent hover:border-outline-variant'
                      }`}
                    >
                      <FyndImage
                        src={img}
                        alt={img.alt || `Thumbnail ${idx + 1}`}
                        fallbackType="kit"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </section>

              {/* Right Column: Details, Sizing, CTA, Specs */}
              <div className="flex flex-col gap-space-md">
                {/* Product Title & Social Proof */}
                <section className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="star" size={16} className="fill-current text-amber-500" />
                      ))}
                    </div>
                    <span className="font-price-current text-body-sm font-bold text-on-surface">
                      {product.rating}
                    </span>
                    <span className="text-on-surface-variant font-body-sm text-body-sm">•</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant underline underline-offset-2">
                      {product.reviewsCount} Verified Ratings
                    </span>
                  </div>

                  <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase tracking-wide text-on-surface font-extrabold leading-tight">
                    {product.title}
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant -mt-0.5">
                    {product.subtitle}
                  </p>

                  {/* Pricing Lockup */}
                  <div className="flex items-baseline gap-space-sm pt-space-xs flex-wrap">
                    <span className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold tracking-tight">
                      {formatINR(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="font-price-original text-price-original text-on-surface-variant line-through text-base">
                        {formatINR(product.originalPrice)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-error-container text-on-error-container font-label-caps text-[11px] font-bold px-2 py-0.5 uppercase tracking-wide">
                        SAVE ₹{Math.round(product.originalPrice - product.price)} (
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                      </span>
                    )}
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    MRP inclusive of all taxes & nationwide logistics insurance
                  </span>
                </section>

                {/* Urgency Stock Notification Strip */}
                <div>
                  <div className="bg-surface-container-high p-space-sm flex items-center justify-between border-l-4 border-amber-600 shadow-xs">
                    <div className="flex items-center gap-space-xs text-on-surface">
                      <Icon name="bolt" size={18} className="text-amber-600 animate-pulse fill-current" />
                      <span className="font-label-caps text-label-caps uppercase tracking-wide font-bold">
                        Only <span className="text-error font-extrabold">{product.stockCount} Kits left</span> in Size {selectedSize}
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] text-on-surface-variant font-medium">
                      Batch #RM-26-AUG
                    </span>
                  </div>
                </div>

                {/* Size Selection & Size Guide */}
                <section className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface font-bold">
                        Select Size
                      </span>
                      <span className="font-body-sm text-body-sm text-primary font-semibold">
                        ({selectedSize} - Standard Fit)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSizeModalOpen(true)}
                      className="flex items-center gap-1 text-primary hover:text-on-surface font-label-caps text-label-caps font-bold uppercase underline underline-offset-4 tracking-wider cursor-pointer"
                    >
                      <Icon name="straighten" size={16} />
                      Size Guide
                    </button>
                  </div>

                  {/* Size Pills Grid */}
                  <div className="grid grid-cols-5 gap-space-xs">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s.size;
                      return (
                        <button
                          key={s.size}
                          type="button"
                          onClick={() => setSelectedSize(s.size)}
                          className={`py-3 flex flex-col items-center justify-center transition-colors font-headline-sm uppercase cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-on-primary font-bold shadow-sm'
                              : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                          }`}
                        >
                          <span>{s.size}</span>
                          <span
                            className={`font-body-sm text-[9px] ${
                              isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'
                            }`}
                          >
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Quantity Selector */}
                <section className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface font-bold">
                    Quantity
                  </span>
                  <div className="flex items-center bg-surface-container-high border border-outline-variant/20">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 cursor-pointer"
                    >
                      <Icon name="remove" size={16} />
                    </button>
                    <span className="w-10 text-center font-headline-sm font-bold text-on-surface select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 cursor-pointer"
                    >
                      <Icon name="add" size={16} />
                    </button>
                  </div>
                </section>

                {/* In-page Primary Action Buttons (Always visible on desktop) */}
                <div className="hidden md:grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="h-12 bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm uppercase tracking-wider font-bold shadow-sm hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-2 border border-outline-variant/30 cursor-pointer"
                  >
                    <Icon name="shopping_bag" size={18} />
                    <span>Add To Bag</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="h-12 bg-primary text-on-primary font-headline-sm text-headline-sm uppercase tracking-wider font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Buy Now • {formatINR(product.price)}</span>
                    <Icon name="arrow_forward" size={18} />
                  </button>
                </div>

                {/* Pincode Check Delivery Module */}
                <section>
                  <div className="bg-surface-container-low p-space-md flex flex-col gap-space-xs border border-outline-variant/20 shadow-xs">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="local_shipping" size={18} className="text-primary" />
                      <span className="font-label-caps text-label-caps uppercase tracking-wider font-bold">
                        Check Delivery & COD Availability
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Enter your 6-digit Indian PIN code to view delivery schedules:
                    </p>
                    <form onSubmit={handlePincodeCheck} className="flex gap-2 mt-1">
                      <input
                        type="tel"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="e.g. 560001"
                        className="flex-1 bg-surface-container-lowest px-3 py-2 text-on-surface font-price-current text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary uppercase tracking-widest border border-outline-variant/30"
                      />
                      <button
                        type="submit"
                        className="bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface font-label-caps text-label-caps px-4 py-2 uppercase tracking-wider font-bold transition-colors shadow-xs cursor-pointer"
                      >
                        Check
                      </button>
                    </form>

                    {pincodeResult && (
                      <div className="flex items-start gap-2 mt-2 pt-2 bg-surface-container-lowest p-2.5 border border-outline-variant/20">
                        <Icon
                          name={pincodeResult.serviceable ? 'check_circle' : 'alert'}
                          size={18}
                          className={pincodeResult.serviceable ? 'text-green-700' : 'text-error'}
                        />
                        <div className="flex flex-col">
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                            {pincodeResult.serviceable
                              ? `Free Express Delivery to ${pincodeResult.pincode} (${pincodeResult.city})`
                              : pincodeResult.estimatedDeliveryText}
                          </span>
                          {pincodeResult.serviceable && (
                            <span className="font-body-sm text-[11px] text-on-surface-variant">
                              Estimated arrival by <strong className="text-primary">Thursday, 3:00 PM</strong> • Cash on Delivery available
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Trust Badges & Guarantee Grid */}
                <section>
                  <div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low text-center border border-outline-variant/20 shadow-xs">
                    <div className="flex flex-col items-center gap-1 px-1">
                      <Icon name="verified" size={22} className="text-primary" />
                      <span className="font-label-caps text-[10px] leading-tight font-bold text-on-surface uppercase">
                        100% Authentic Drop Replica
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 px-1">
                      <Icon name="sync_alt" size={22} className="text-primary" />
                      <span className="font-label-caps text-[10px] leading-tight font-bold text-on-surface uppercase">
                        7 Days Free Size Exchange
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1 px-1">
                      <Icon name="lock" size={22} className="text-primary" />
                      <span className="font-label-caps text-[10px] leading-tight font-bold text-on-surface uppercase">
                        UPI & Secure Instant Checkout
                      </span>
                    </div>
                  </div>
                </section>

                {/* Accordion Specs Stack */}
                <section className="flex flex-col gap-2">
                  <details className="group bg-surface-container-low border border-outline-variant/20" open>
                    <summary className="flex items-center justify-between p-space-md cursor-pointer list-none select-none">
                      <div className="flex items-center gap-2">
                        <Icon name="apparel" size={20} className="text-primary" />
                        <span className="font-headline-sm uppercase tracking-wide text-on-surface font-bold">
                          Product Description & Specs
                        </span>
                      </div>
                      <Icon
                        name="expand_more"
                        size={20}
                        className="text-on-surface transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <div className="px-space-md pb-space-md pt-0 text-on-surface-variant font-body-sm flex flex-col gap-3">
                      <p>{product.description}</p>
                      <div className="bg-surface-container-lowest p-space-sm grid grid-cols-2 gap-2 text-[11px] border border-outline-variant/10">
                        <div>
                          <strong className="text-on-surface">Material:</strong> {product.specs.material}
                        </div>
                        <div>
                          <strong className="text-on-surface">Fit:</strong> {product.specs.fit}
                        </div>
                        <div>
                          <strong className="text-on-surface">Badges:</strong> {product.specs.badges}
                        </div>
                        <div>
                          <strong className="text-on-surface">Print:</strong> {product.specs.print}
                        </div>
                      </div>
                    </div>
                  </details>

                  <details className="group bg-surface-container-low border border-outline-variant/20">
                    <summary className="flex items-center justify-between p-space-md cursor-pointer list-none select-none">
                      <div className="flex items-center gap-2">
                        <Icon name="local_shipping" size={20} className="text-primary" />
                        <span className="font-headline-sm uppercase tracking-wide text-on-surface font-bold">
                          Shipping & Free Returns
                        </span>
                      </div>
                      <Icon
                        name="expand_more"
                        size={20}
                        className="text-on-surface transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <div className="px-space-md pb-space-md pt-0 text-on-surface-variant font-body-sm flex flex-col gap-2">
                      <p>• Orders dispatched within 24 hours via Bluedart Air & Delhivery Priority.</p>
                      <p>
                        • Hassle-free 7-day doorstep size exchange. If the fit isn't razor-sharp, our courier collects it for an immediate replacement with zero return pickup charges.
                      </p>
                    </div>
                  </details>

                  <details className="group bg-surface-container-low border border-outline-variant/20">
                    <summary className="flex items-center justify-between p-space-md cursor-pointer list-none select-none">
                      <div className="flex items-center gap-2">
                        <Icon name="dry_cleaning" size={20} className="text-primary" />
                        <span className="font-headline-sm uppercase tracking-wide text-on-surface font-bold">
                          Garment Care Instructions
                        </span>
                      </div>
                      <Icon
                        name="expand_more"
                        size={20}
                        className="text-on-surface transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <div className="px-space-md pb-space-md pt-0 text-on-surface-variant font-body-sm flex flex-col gap-2">
                      <p>• Machine wash cold at 30°C on gentle cycle inside out.</p>
                      <p>• Do not tumble dry. Air dry in shade to preserve nameplate foil and crest heat-press.</p>
                      <p>• Do not iron directly over sponsor or player typography prints.</p>
                    </div>
                  </details>
                </section>
              </div>
            </div>
          </div>

          {/* Editorial Footer */}
          <div className="mt-12">
            <Footer />
          </div>
        </div>
      </main>

      {/* Sticky Bottom Quick-Buy Navigation Bar (Mobile only) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-margin py-2.5 flex items-center gap-space-xs pb-safe border-t border-outline-variant/20">
        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Add to Wishlist"
          onClick={handleWishlistToggle}
          className="w-12 h-12 shrink-0 bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface transition-colors active:scale-95 border border-outline-variant/20 cursor-pointer"
        >
          <Icon
            name={isFavorited ? 'favorite' : 'favorite_border'}
            size={20}
            className={isFavorited ? 'text-error' : 'text-on-surface'}
          />
        </button>

        {/* Secondary CTA: Add to Bag */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 h-12 bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm uppercase tracking-wider font-bold shadow-sm hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-1.5 px-2 border border-outline-variant/30 cursor-pointer"
        >
          <Icon name="shopping_bag" size={18} />
          <span>Add To Bag</span>
        </button>

        {/* Primary CTA: Buy Now */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-[1.2] h-12 bg-primary text-on-primary font-headline-sm text-headline-sm uppercase tracking-wider font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 px-2 cursor-pointer"
        >
          <span>Buy Now • {formatINR(product.price)}</span>
          <Icon name="arrow_forward" size={18} />
        </button>
      </div>

      {/* Size Guide Slide-up Modal */}
      {isSizeModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSizeModalOpen(false);
          }}
        >
          <div className="w-full max-w-md bg-surface p-space-lg flex flex-col gap-space-md shadow-2xl animate-[slideUp_0.25s_ease-out]">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <Icon name="straighten" size={22} className="text-primary" />
                <h3 className="font-headline-md text-headline-md uppercase tracking-wider text-on-surface font-bold">
                  Size Guide (Inches)
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close Size Chart"
                onClick={() => setIsSizeModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary cursor-pointer"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead>
                  <tr className="bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase tracking-wider">
                    <th className="p-2.5 font-bold">Size</th>
                    <th className="p-2.5 font-bold">Chest</th>
                    <th className="p-2.5 font-bold">Length</th>
                    <th className="p-2.5 font-bold">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr className="bg-surface-container-low">
                    <td className="p-2.5 font-bold text-on-surface">S</td>
                    <td className="p-2.5">38"</td>
                    <td className="p-2.5">27"</td>
                    <td className="p-2.5">17"</td>
                  </tr>
                  <tr className="bg-primary-container text-on-primary-fixed font-semibold">
                    <td className="p-2.5 font-bold">M (Current)</td>
                    <td className="p-2.5">40"</td>
                    <td className="p-2.5">28"</td>
                    <td className="p-2.5">18"</td>
                  </tr>
                  <tr className="bg-surface-container-low">
                    <td className="p-2.5 font-bold text-on-surface">L</td>
                    <td className="p-2.5">42"</td>
                    <td className="p-2.5">29"</td>
                    <td className="p-2.5">19"</td>
                  </tr>
                  <tr className="bg-surface-container-low">
                    <td className="p-2.5 font-bold text-on-surface">XL</td>
                    <td className="p-2.5">44"</td>
                    <td className="p-2.5">30"</td>
                    <td className="p-2.5">20"</td>
                  </tr>
                  <tr className="bg-surface-container-low">
                    <td className="p-2.5 font-bold text-on-surface">2XL</td>
                    <td className="p-2.5">46"</td>
                    <td className="p-2.5">31"</td>
                    <td className="p-2.5">21"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-surface-container-high p-space-sm flex items-start gap-2 text-[11px] text-on-surface-variant">
              <Icon name="info" size={16} className="text-primary shrink-0" />
              <span>
                Fit Advice: If you prefer a loose streetwear baggy aesthetic, we recommend ordering one size above your measured chest circumference.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsSizeModalOpen(false)}
              className="w-full py-3 bg-primary text-on-primary font-headline-sm uppercase tracking-wider font-bold shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
            >
              Got It, Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
