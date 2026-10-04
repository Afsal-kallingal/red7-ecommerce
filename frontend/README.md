# FYND — Production Frontend (Mobile-First E-Commerce)

> Visual Source of Truth: **Stitch MCP Project `13633786757686588013`**  
> Target: **India Matchday Football Kits & Terrace Culture Streetwear**

FYND is a production-ready, mobile-first e-commerce web platform engineered for instant product discovery, high-speed UPI intent checkout, and robust Indian logistics.

---

## 1. Tech Stack

- **Framework**: Next.js 15+ (App Router, Server Components & Dynamic Client Modules)
- **Language**: TypeScript (Strict typing across schemas, domain models & services)
- **Styling**: Tailwind CSS v4 + Custom Stitch Design Tokens
- **Icons**: Google Material Symbols Outlined + Lucide
- **State Management**: Zustand (Local storage persistence for Bag, Wishlist & UI)
- **Network & Caching**: TanStack Query v5 + Axios service layer
- **Validation**: Zod + React Hook Form

---

## 2. Key Features

### Storefront Experience
- **Discovery Home (`/`)**: Hero lookbook drop, animated promotional ticker strip, 2-column curated department grid, 26/27 season kit showcase, flash bundle drop banner, verified customer review carousel, drop radar newsletter, and WhatsApp concierge.
- **Catalog & Filter Matrix (`/shop`)**: Multi-filter slide-out sheet (Club, Size, Price ceiling), 2-column vs. 1-column layout toggle, and sort controls.
- **Departments (`/categories`)**: Visual navigation across Football Kits, Sportswear, Streetwear, Shoes, and Accessories.
- **Interactive Search**: Modal overlay with instant substring matching, team suggestions, and quick view cards.
- **Product Detail Page (`/products/[slug]`)**: 4-photo zoomable media gallery, size pills with chest measurements, size guide modal dialog, real-time Indian PIN code delivery checker, accordion specs, and sticky bottom action bar.
- **Shopping Bag (`/cart`)**: Quantity stepper, free express air freight progress bar, coupon code redemption, and total computation.
- **3-Step Checkout with UPI Intent (`/checkout`)**: 07:42 drop reservation countdown, itemized vault ticket, 2x2 UPI intent matrix (Google Pay, PhonePe, Paytm, BHIM), VPA verification, Card/NetBanking/COD accordions, and simulated high-speed payment authorization.
- **Order Confirmation & Tracking (`/order-confirmation/[id]`, `/track-order`)**: Unique Allocation ID (`#FYND-88291`), 4-stage dispatch stepper (`PLACED` -> `PACKED` -> `TRANSIT` -> `DELIVERED`), vault receipt, courier AWB tracking, and 1-tap WhatsApp alert subscription.
- **Customer Account (`/account`, `/account/addresses`)**: Supporter profile, order history links, and saved delivery addresses.
- **Customer Assurance (`/coupons`, `/reviews`, `/faq`, `/contact`, `/policies`)**: Discoverable vouchers with copy-to-clipboard, verified rating breakdown with review submission, help center accordions, and 7-day doorstep size replacement policy.

### Admin Operations Portal (`/admin`)
- **Dashboard & KPIs (`/admin`)**: Today's revenue, active airline shipments, low-stock warnings, and recent fulfillment list.
- **Catalog Management (`/admin/products`)**: Add, edit, and delete products, set selling price, MRP, badges, and primary images.
- **Variant Stock Inventory (`/admin/inventory`)**: Real-time stock matrix per size variant (`S`, `M`, `L`, `XL`, `2XL`).
- **Fulfillment Pipeline (`/admin/orders`)**: Real-time order status updater (`PLACED` -> `PACKED` -> `TRANSIT` -> `DELIVERED`).
- **Media Asset Vault (`/admin/media`)**: Image asset uploader, delete, and primary showcase image setter.
- **Homepage CMS Editor (`/admin/banners`)**: Real-time headline, subheadline, and flash sale banner modifier.
- **Promotions (`/admin/coupons`)**: Deploy new coupon codes and toggle active/paused states.
- **Customer CRM (`/admin/customers`)**: Lifetime supporter purchase records and contact registry.
- **Review Moderation (`/admin/reviews`)**: Moderate and manage public buyer testimonials.

---

## 3. Centralized Image & Fallback Architecture

To ensure immediate deployment readiness with zero broken image states, all images route through `/src/lib/images.ts`:

```
product.image
    ↓
backend image when available (S3 / Cloudflare R2 CDN)
    ↓
default high-resolution brand SVG placeholder when unavailable
```

Components never hardcode remote assets directly; they utilize the `<FyndImage />` wrapper or `resolveImageUrl()`.

---

## 4. Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 5. Production Build & Deployment

### Local Production Build
```bash
npm run build
npm run start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t fynd-frontend:latest .

# Run container
docker run -p 3000:3000 fynd-frontend:latest
```

---

## 6. Future FastAPI Backend Integration

When the FastAPI Python backend is provisioned:
1. Update `.env.production`:
   ```env
   NEXT_PUBLIC_USE_MOCK_API=false
   NEXT_PUBLIC_API_URL=https://api.fynd.in/api/v1
   ```
2. The typed API contract defined in `/docs/api/API.md` will seamlessly replace the in-memory adapter without modifying any UI components.
