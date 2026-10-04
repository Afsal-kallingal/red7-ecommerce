# RED7 — Retro Football Kits & Streetwear E-Commerce

RED7 is a production-grade, mobile-first e-commerce web platform engineered for retro football kit drops, terrace streetwear culture, instant UPI deep-link payments, and automated Indian express logistics.

---

## 1. Project Structure

```
FYND/
├── frontend/             # Complete Next.js 15+ App Router application
│   ├── src/
│   │   ├── app/          # Storefront & Admin Portal routes (27 pages)
│   │   ├── components/   # UI components & Storefront design system
│   │   ├── lib/          # Utilities, image resolver & tokens
│   │   ├── services/     # API service layer (mock & future backend)
│   │   ├── store/        # Zustand stores (cart, wishlist, UI)
│   │   └── types/        # TypeScript interfaces & domain models
│   └── package.json
└── docs/                 # Architecture, specifications & backend contract
    ├── backend-spec/     # Complete future backend specification (OpenAPI, DB, APIs)
    ├── api/              # API contract documentation
    ├── architecture/     # Design system tokens & architecture
    └── specs/            # Feature specifications
```

---

## 2. Key Capabilities

### Customer Storefront
- **Mobile-First UX:** Optimized for 320px–430px viewports with responsive desktop adaptation.
- **Product Discovery & Drops:** 2-column mobile kit grid, search modal with live fuzzy debounce, trending chips, and club filters.
- **Interactive PDP:** 4:5 portrait media gallery, horizontal touch side-swipe, measurement pills (`S` to `2XL`), size chart dialog, and 6-digit Indian PIN delivery checker.
- **High-Speed Checkout:** 10-minute reservation countdown, UPI deep-link intent matrix (GPay, PhonePe, Paytm, BHIM), manual VPA validation, and Cash on Delivery (COD).
- **Fulfillment & Tracking:** Unique Allocation ID (`#FYND-88291`), multi-stage milestone tracking, and 1-tap WhatsApp alert integration.

### Admin Operations Portal (`/admin`)
- **Dashboard & KPIs:** Real-time gross revenue, order pipeline, active shipments, and low-stock indicators.
- **Catalog & Inventory:** Product creation/editing, pricing controls, and variant stock controller.
- **Media Vault:** Multi-image gallery manager, image uploader, and primary showcase image selector.
- **Fulfillment Pipeline:** Order status dispatcher (`PLACED` -> `PACKED` -> `TRANSIT` -> `DELIVERED`).
- **Promotions & CMS:** Coupon deployment engine, homepage hero copy modifier, and banner management.

---

## 3. Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm 10+

### Installation & Local Run
```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) to view the admin portal.

### Production Build Validation
```bash
cd frontend
npm run lint
npm run build
```

---

## 4. Documentation & Future Backend Specification

Comprehensive backend specifications and OpenAPI contracts are located in [`/docs/backend-spec/`](docs/backend-spec/):
- **API Specification:** `docs/backend-spec/API.md`
- **OpenAPI 3.1.0 Contract:** `docs/backend-spec/OPENAPI.yaml`
- **PostgreSQL Database Schema:** `docs/backend-spec/DATABASE_SPEC.md`
- **Auth & RBAC Matrix:** `docs/backend-spec/AUTH_RBAC.md`
- **Search & Trigram Indexing:** `docs/backend-spec/SEARCH_SPEC.md`
- **UPI & Payment Systems:** `docs/backend-spec/PAYMENT_SPEC.md`
- **Media Pipeline & CDN:** `docs/backend-spec/MEDIA_SPEC.md`
- **Admin Settings Spec:** `docs/backend-spec/ADMIN_SPEC.md`
- **Frontend-to-Backend Mapping:** `docs/backend-spec/FRONTEND_BACKEND_MAPPING.md`
