# FYND E-Commerce Platform — Frontend System Architecture

## 1. Architectural Overview & Design Philosophy

FYND is an ultra-fast, mobile-first, editorial streetwear and sports merchandise discovery platform engineered for the Indian market (₹ INR, UPI Intent, Indian PIN code logistics, WhatsApp direct commerce). 

```
                                  +------------------------------+
                                  |    Stitch MCP Design System  |
                                  |   (Project: 136337867576...) |
                                  +--------------+---------------+
                                                 |
                                                 v
                                  +------------------------------+
                                  |    Next.js 15+ App Router    |
                                  |   (SSR / Client Hybrid Core) |
                                  +--------------+---------------+
                                                 |
                   +-----------------------------+-----------------------------+
                   |                                                           |
                   v                                                           v
+------------------------------------+                       +-----------------------------------+
|     Storefront Experience (/...)   |                       |        Admin Panel (/admin)       |
|  - Home & Drop Radar               |                       |  - Metric Dashboard / KPIs        |
|  - Department & Catalog Listing    |                       |  - Product Catalog CRUD & Stock   |
|  - Interactive PDP & Sizing Chart  |                       |  - Order Fulfillment Pipeline     |
|  - Bag Drawer & Full Cart          |                       |  - Media Asset Vault              |
|  - 3-Step Checkout with UPI Intent |                       |  - CMS & Banner Configuration     |
|  - Order Tracking & Allocation ID  |                       |  - Customer Management            |
|  - Customer Profile & Addresses    |                       |  - Coupon & Review Moderation     |
+------------------+-----------------+                       +-----------------+-----------------+
                   |                                                           |
                   +-----------------------------+-----------------------------+
                                                 |
                                                 v
                                  +------------------------------+
                                  |   Zustand Global State       |
                                  |  (Cart, Wishlist, Filter, UI)|
                                  +--------------+---------------+
                                                 |
                                                 v
                                  +------------------------------+
                                  |  TanStack Query Data Layer   |
                                  |   (Caching, Invalidation)    |
                                  +--------------+---------------+
                                                 |
                                                 v
                                  +------------------------------+
                                  |   Typed API Service & Mock   |
                                  |   Adapter Layer (Axios)      |
                                  +--------------+---------------+
                                                 |
                        +------------------------+------------------------+
                        |                                                 |
                        v (Now: Frontend Only)                            v (Future Backend)
          +----------------------------+                     +----------------------------+
          |  Mock In-Memory Adapter    |                     |    FastAPI Python Engine   |
          |  - Seeded Catalog          |                     |    PostgreSQL + Prisma     |
          |  - Centralized Fallbacks   |                     |    Cloudflare R2 / S3 CDN  |
          +----------------------------+                     +----------------------------+
```

---

## 2. Directory Layout

The codebase strictly decouples visual presentation, state management, media resolution, and network services:

```
frontend/
├── docs/
│   ├── api/
│   │   └── API.md                    # Future FastAPI Specification
│   ├── architecture/
│   │   ├── SYSTEM_ARCHITECTURE.md    # System Blueprint
│   │   ├── STATE_MANAGEMENT.md       # Zustand & TanStack Query patterns
│   │   └── DESIGN_SYSTEM_TOKENS.md   # Stitch Colors, Typography & Radii
│   └── specs/                        # Spec-driven feature blueprints
├── src/
│   ├── app/
│   │   ├── (storefront)/             # Customer Storefront routes
│   │   │   ├── page.tsx              # Home / Drop Radar
│   │   │   ├── shop/                 # Catalog listing
│   │   │   ├── categories/           # Categories grid
│   │   │   ├── search/               # Search engine
│   │   │   ├── products/[slug]/      # PDP
│   │   │   ├── cart/                 # Full Cart
│   │   │   ├── checkout/             # 3-Step Checkout & UPI Intent
│   │   │   ├── order-confirmation/   # Receipt & Allocation status
│   │   │   ├── orders/               # Orders list
│   │   │   ├── track-order/          # Order tracker
│   │   │   ├── wishlist/             # Saved items
│   │   │   ├── account/              # Account & Addresses
│   │   │   ├── coupons/              # Active promotions
│   │   │   ├── reviews/              # Verified ratings
│   │   │   ├── faq/                  # Help center
│   │   │   ├── contact/              # Support & WhatsApp concierge
│   │   │   └── policies/             # Shipping, Returns, Terms, Privacy
│   │   ├── admin/                    # Admin Dashboard routes
│   │   │   ├── page.tsx              # KPI overview
│   │   │   ├── products/             # Product list & editor
│   │   │   ├── orders/               # Order pipeline
│   │   │   ├── customers/            # Customer list
│   │   │   ├── inventory/            # Stock controller
│   │   │   ├── media/                # Media manager
│   │   │   ├── banners/              # Banner CMS
│   │   │   ├── coupons/              # Promo engine
│   │   │   └── reviews/              # Moderation
│   │   ├── layout.tsx                # Root layout with fonts & providers
│   │   └── globals.css               # Tailwind CSS custom properties
│   ├── components/
│   │   ├── storefront/               # Header, BottomNav, KitCard, Drawer, etc.
│   │   ├── admin/                    # AdminSidebar, MetricCard, DataTable, etc.
│   │   ├── ui/                       # Button, Badge, Dialog, Modal, Input, Skeleton
│   │   └── providers/                # QueryProvider, ToastProvider
│   ├── hooks/                        # Custom hooks (useCart, usePincode, etc.)
│   ├── lib/
│   │   ├── utils.ts                  # cn, formatters, currency
│   │   └── images.ts                 # Centralized Image & Fallback Engine
│   ├── services/
│   │   ├── api/                      # Typed Axios client & service interfaces
│   │   ├── mock/                     # Typed Mock Store & DB Adapters
│   │   └── index.ts                  # Exported API Client (swappable to FastAPI)
│   ├── store/
│   │   ├── cartStore.ts              # Zustand cart state with persistence
│   │   ├── wishlistStore.ts          # Zustand wishlist state with persistence
│   │   └── uiStore.ts                # Drawer, Search Modal, Filter states
│   └── types/
│       ├── product.ts
│       ├── order.ts
│       ├── media.ts
│       ├── checkout.ts
│       └── admin.ts
├── public/
│   └── placeholders/                 # Default base SVG/WebP images
├── .env.example
├── Dockerfile
├── .dockerignore
└── README.md
```

---

## 3. Image & Asset Resiliency Pipeline

To avoid hardcoded URLs and ensure zero code rewrites when real backend media is provisioned, all image rendering routes through `src/lib/images.ts`:

1. `getImageUrl(mediaItem, fallbackType)`:
   - Primary: Remote backend URL (S3 / Cloudflare R2 CDN)
   - Secondary: Local optimized fallback placeholder (Kits, Streetwear, Banners, Avatars)
   - Guarantees `next/image` or fallback `img` never fails with broken image icons.
2. SVG/Data URIs for immediate, deterministic zero-latency visual testing.

---

## 4. Mobile-First Responsive Breakpoints

Designed for high-performance touch devices with complete responsive parity:
- **Mobile Compact (320px - 380px)**: Tight gutters, 2-column compact grid, sticky bottom buy bar.
- **Mobile Standard (390px - 480px)**: Exact Stitch reference target viewport (iPhone / Android flagship).
- **Tablet (768px - 1024px)**: 3-4 column catalog, side drawer or split-screen checkout.
- **Desktop (1024px+)**: Centered container, sticky sidebar summary, expanded navigation.
