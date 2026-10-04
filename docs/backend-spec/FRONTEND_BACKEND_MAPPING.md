# RED7 Frontend-to-Backend Integration Mapping
**Version:** 1.0.0  
**Target Codebase:** `frontend/src/*`  
**API Specification:** `/api/v1`

---

## 1. Overview & Architecture Preservation

The RED7 frontend is complete, fully validated, and frozen. This document maps every frontend component, route, hook, and state store in `frontend/src/` to its corresponding `/api/v1` endpoint.

When transitioning from the mock in-memory service (`src/services/api/index.ts`) to the live FastAPI backend, **zero React component JSX or Tailwind styles will change**. The service functions will simply switch from mock returns to Axios / Fetch calls to `/api/v1`.

---

## 2. Storefront Pages & Components Mapping

### 2.1 Landing Page & Editorial Showcase (`src/app/page.tsx`)
| UI Section | Frontend Consumer | Service Method | Future Backend Endpoint | Request | Response Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Editorial Hero** | `page.tsx` Hero Lockup | `api.getHomepageCms()` | `GET /api/v1/cms/homepage` | None | `HomepageCms['hero']` |
| **Marquee Ticker** | `PromoTicker.tsx` | `api.getHomepageCms()` | `GET /api/v1/cms/homepage` | None | `TickerItem[]` |
| **Dual Lifestyle Banners** | `DualLifestyleBanners.tsx` | `api.getHomepageCms()` | `GET /api/v1/cms/homepage` | None | `LifestyleBannerItem[]` |
| **Catalog Grid (2-col)** | `ProductCatalogSection.tsx` | `api.getProducts()` | `GET /api/v1/products` | `?limit=8&featured=true` | `{ items: Product[], total: number }` |
| **Flash Drop Banner** | `page.tsx` Flash Section | `api.getHomepageCms()` | `GET /api/v1/cms/homepage` | None | `HomepageCms['flashBanner']` |
| **Floating WhatsApp** | `WhatsAppFloat.tsx` | Global Layout / Config | `GET /api/v1/store/settings/public` | None | `{ whatsapp: { phoneNumber, defaultMessage } }` |

---

### 2.2 Product Detail Page (`src/app/products/[slug]/page.tsx`)
| UI Feature | Frontend Handler | Service Method | Future Backend Endpoint | Request | Response Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Product Hydration** | `useEffect` on `[slug]` | `api.getProductBySlug(slug)` | `GET /api/v1/products/{slug}` | Path: `slug` | `Product` |
| **Size Pills (`S` to `2XL`)** | Size Selector | (Embedded in `Product`) | `GET /api/v1/products/{id}/sizes` | Path: `id` | `SizeInventory[]` |
| **PIN Delivery Check** | `handlePincodeCheck` | `api.checkPincode(pincode)` | `GET /api/v1/logistics/pincode/{pincode}` | Path: `pincode` | `PincodeCheckResult` |
| **Add To Bag** | `handleAddToCart` | `useCartStore.addItem()` | (Client Store + `POST /api/v1/cart/validate`) | Item body | `{ valid: boolean }` |
| **Wishlist Toggle** | `handleWishlistToggle` | `useWishlistStore.toggleWishlist()` | `POST /api/v1/wishlist/{productId}` | Path: `productId` | `{ isSaved: boolean }` |

---

### 2.3 Shop & Filter Catalog (`src/app/shop/page.tsx`)
| UI Feature | Frontend Handler | Service Method | Future Backend Endpoint | Request | Response Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Catalog Query & Sort** | `loadData` `useEffect` | `api.getProducts(params)` | `GET /api/v1/products` | `?category=&club=&sort=&maxPrice=` | `{ items: Product[], total: number }` |
| **Facet Counters** | Filter Modal Trigger | (Computed in memory) | `GET /api/v1/catalog/filters` | Query filters | Facet aggregates |
| **2x2 / 1-col Toggle** | `setLayout` state | (Pure UI State) | None | N/A | Local UI State |

---

### 2.4 Search Modal (`src/components/storefront/SearchModal.tsx`)
| UI Feature | Frontend Handler | Service Method | Future Backend Endpoint | Request | Response Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Live Debounced Search** | `useEffect` (`searchTerm`, 200ms) | `api.getProducts({ query })` | `GET /api/v1/search` | `?q={searchTerm}&limit=6` | `{ items: Product[], total: number }` |
| **Trending Chips** | Chip Click (`AC Milan`, etc.) | Local list | `GET /api/v1/search/suggestions` | None | `{ trendingChips: string[] }` |

---

### 2.5 Checkout & Payment Flow (`src/app/checkout/page.tsx`)
| UI Feature | Frontend Handler | Service Method | Future Backend Endpoint | Request | Response Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Order Placement** | `executeOrderSubmission` | `api.createOrder()` | `POST /api/v1/checkout/orders` | `CheckoutFormData` + items | `Order` |
| **VPA Verification** | `handleVerifyVpa` | (Regex in mock) | `POST /api/v1/checkout/upi/verify-vpa` | `{ vpa: string }` | `{ valid: boolean, customerName: string }` |
| **UPI App Intent** | GPay/PhonePe click | Local Intent URL | `POST /api/v1/checkout/upi/intent` | `{ orderId, upiApp }` | `{ upiIntentUrl: string, deepLink: string }` |
| **Coupon Validation** | Coupon apply in summary | `api.validateCoupon()` | `POST /api/v1/coupons/validate` | `{ code, subtotal }` | `{ valid: boolean, discount: number }` |
| **Countdown Timer** | 10-min reservation timer | Local interval | Managed by Order `paymentPayload.expiresAt` | None | Syncs to server expiry |

---

### 2.6 Order Confirmation & Tracking (`src/app/order-confirmation/[id]/page.tsx`, `src/app/track-order/page.tsx`)
| UI Feature | Frontend Handler | Service Method | Future Backend Endpoint | Request | Response Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Order Hydration** | `useEffect` on `[id]` | `api.getOrderById(id)` | `GET /api/v1/orders/{id}` | Path: `id` or `allocationId` | `Order` |
| **Live Dispatch Timeline**| Tracking Card | (Mock timeline) | `GET /api/v1/orders/track/{awbOrId}` | Path: `awbOrId` | Milestone timeline DTO |
| **WhatsApp Updates** | `handleWhatsAppAlerts` | Local `wa.me` generator | Dynamic via `store_settings.whatsapp` | None | Open WhatsApp with text |

---

### 2.7 Supporter Account & Destinations (`src/app/account/page.tsx`, `src/app/account/addresses/page.tsx`)
| UI Feature | Frontend Handler | Service Method | Future Backend Endpoint | Request | Response Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Supporter Profile** | Page Load | Profile Mock | `GET /api/v1/customers/profile` | Bearer Token | Customer profile + VIP tier |
| **Saved Addresses List** | Page Load | Local state | `GET /api/v1/customers/addresses` | Bearer Token | `ShippingAddress[]` |
| **Save New Address** | `handleSave` | Local state | `POST /api/v1/customers/addresses` | `ShippingAddress` | Created address DTO |

---

## 3. Backoffice Admin Portal Mapping (`src/app/admin/*`)

### 3.1 Dashboard & KPI Analytics (`src/app/admin/page.tsx`)
| UI Metric / Table | Service Method | Future Backend Endpoint | Response Type |
| :--- | :--- | :--- | :--- |
| **KPI Metrics Cards** | `api.getAdminKpis()` | `GET /api/v1/admin/kpis` | `AdminKpiSummary` |
| **Recent Fulfillment Pipeline**| `api.getOrders()` | `GET /api/v1/admin/orders?limit=5` | `Order[]` |

---

### 3.2 Product Catalog (`src/app/admin/products/page.tsx`)
| Action | Service Method | Future Backend Endpoint | Request Body |
| :--- | :--- | :--- | :--- |
| **List Products** | `api.getProducts()` | `GET /api/v1/products?limit=100` | N/A |
| **Add Product** | `api.addProduct()` | `POST /api/v1/admin/products` | `AdminProductPayload` |
| **Edit Product** | `api.updateProduct()` | `PUT /api/v1/admin/products/{id}` | Partial `Product` |
| **Delete Product** | `api.deleteProduct()` | `DELETE /api/v1/admin/products/{id}` | N/A |

---

### 3.3 Inventory Controller (`src/app/admin/inventory/page.tsx`)
| Action | Service Method | Future Backend Endpoint | Request Body |
| :--- | :--- | :--- | :--- |
| **Adjust Size Stock (+ / -)** | `handleUpdateStock` | `PATCH /api/v1/admin/inventory/{id}/sizes/{size}` | `{ delta: number }` |

---

### 3.4 Media Vault Controller (`src/app/admin/media/page.tsx`)
| Action | Service Method | Future Backend Endpoint | Request Body |
| :--- | :--- | :--- | :--- |
| **Add / Upload Asset** | `handleAddImage` | `POST /api/v1/media/upload-url` + S3 PUT | `{ filename, mimeType }` |
| **Set Primary Showcase** | `handleSetPrimary` | `PUT /api/v1/admin/products/{id}/gallery/{assetId}/primary` | N/A |
| **Remove Gallery Image** | `handleDeleteImage` | `DELETE /api/v1/admin/products/{id}/gallery/{assetId}` | N/A |

---

### 3.5 Banners & Homepage CMS (`src/app/admin/banners/page.tsx`)
| Action | Service Method | Future Backend Endpoint | Request Body |
| :--- | :--- | :--- | :--- |
| **Load Current CMS** | `api.getHomepageCms()` | `GET /api/v1/cms/homepage` | N/A |
| **Update Hero Showcase** | `handleSaveHero` | `PUT /api/v1/admin/cms/homepage` | Hero section payload |
| **Update Flash Sale Banner**| `handleSaveFlash` | `PUT /api/v1/admin/cms/homepage` | Flash banner payload |

---

### 3.6 Order Fulfillment (`src/app/admin/orders/page.tsx`)
| Action | Service Method | Future Backend Endpoint | Request Body |
| :--- | :--- | :--- | :--- |
| **Filter by Status** | `filterStatus` | `GET /api/v1/admin/orders?status={status}`| N/A |
| **Change Status** | `handleStatusChange` | `PATCH /api/v1/admin/orders/{id}/status` | `{ status: OrderStatus }` |

---

### 3.7 Coupons Engine (`src/app/admin/coupons/page.tsx`)
| Action | Service Method | Future Backend Endpoint | Request Body |
| :--- | :--- | :--- | :--- |
| **List Promo Vouchers** | `api.getCoupons()` | `GET /api/v1/coupons` | N/A |
| **Deploy Coupon** | `handleAddCoupon` | `POST /api/v1/admin/coupons` | `CouponItem` payload |
| **Pause / Activate** | `toggleCouponActive` | `PATCH /api/v1/admin/coupons/{id}/toggle` | N/A |

---

### 3.8 Customer Reviews Moderation (`src/app/admin/reviews/page.tsx`)
| Action | Service Method | Future Backend Endpoint | Request Body |
| :--- | :--- | :--- | :--- |
| **List Reviews** | `api.getReviews()` | `GET /api/v1/reviews` | N/A |
| **Delete / Hide Review** | `handleDelete` | `DELETE /api/v1/admin/reviews/{id}` | N/A |
