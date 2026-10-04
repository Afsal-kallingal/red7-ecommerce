# RED7 Backend API Master Endpoint Index
**Specification Version:** 1.0.0  
**API Root Prefix:** `/api/v1`  
**Target Environment:** Production ASGI (FastAPI / PostgreSQL)  
**Consumer Interface:** RED7 Storefront & Backoffice Admin (Next.js 15 App Router)

---

## 1. Architecture Overview & Global Conventions

All backend endpoints are namespaced under `/api/v1`. The API follows RESTful resource hierarchy, RFC 7807 problem details for structured error handling, and strict JSON serialization matching frontend TypeScript contracts (`src/types/`).

### Global Status Codes
| HTTP Status | Semantics | Description |
| :--- | :--- | :--- |
| `200 OK` | Success | Request succeeded with response body. |
| `201 Created` | Created | Resource successfully created (Orders, Products, Reviews). |
| `204 No Content` | No Content | Action succeeded with no body (Delete, Heartbeat). |
| `400 Bad Request` | Client Error | Malformed syntax or invalid query parameters. |
| `401 Unauthorized` | Auth Required | Missing or invalid Bearer JWT or session cookie. |
| `403 Forbidden` | Access Denied | Authenticated user lacks required RBAC role. |
| `404 Not Found` | Not Found | Requested entity (Product slug, Order allocation ID) does not exist. |
| `409 Conflict` | Conflict | Duplicate resource (e.g. coupon code already exists, duplicate VPA). |
| `422 Unprocessable` | Validation Error | Request body failed Pydantic / Zod schema validation rules. |
| `429 Too Many Req` | Rate Limited | IP / User exceeded tier rate limit quota. |
| `500 Server Error` | Internal Error | Unhandled server exception with internal correlation ID. |

---

## 2. Master Endpoint Catalog

### A. Authentication, Customer Identity & RBAC
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/otp/send` | Public | Send 6-digit verification OTP to customer phone | Checkout, Customer Account |
| `POST` | `/api/v1/auth/otp/verify` | Public | Verify customer OTP & exchange for Session JWT | Checkout, Customer Account |
| `POST` | `/api/v1/auth/admin/login` | Public | Admin email + password + TOTP 2FA authentication | Admin Login Modal |
| `POST` | `/api/v1/auth/admin/refresh` | Refresh Cookie | Exchange refresh token for fresh access token | Admin Layout & Axios Interceptor |
| `POST` | `/api/v1/auth/logout` | Authenticated | Revoke current session token and clear cookies | Admin Header, Account Page |
| `GET` | `/api/v1/auth/me` | Authenticated | Retrieve current authenticated user profile & permissions | Storefront Header, Admin Header |

### B. Customer Profile & Addresses
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/customers/profile` | Customer / Admin | Retrieve supporter profile, VIP tier & order metrics | `src/app/account/page.tsx` |
| `PUT` | `/api/v1/customers/profile` | Customer | Update customer contact info & preferences | `src/app/account/page.tsx` |
| `GET` | `/api/v1/customers/addresses` | Customer | Retrieve list of saved delivery destinations | `src/app/account/addresses/page.tsx` |
| `POST` | `/api/v1/customers/addresses` | Customer | Save a new delivery destination | `src/app/account/addresses/page.tsx` |
| `PUT` | `/api/v1/customers/addresses/{id}` | Customer | Update an existing delivery destination | `src/app/account/addresses/page.tsx` |
| `DELETE` | `/api/v1/customers/addresses/{id}` | Customer | Remove a saved delivery destination | `src/app/account/addresses/page.tsx` |
| `PATCH` | `/api/v1/customers/addresses/{id}/default` | Customer | Mark address as primary shipping destination | `src/app/account/addresses/page.tsx` |

### C. Catalog: Products, Categories & Variants
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/products` | Public | List products with filtering, sorting, and pagination | `src/components/storefront/ProductCatalogSection.tsx`, `src/app/shop/page.tsx` |
| `GET` | `/api/v1/products/{slug}` | Public | Retrieve full product details, specs, sizes & gallery | `src/app/products/[slug]/page.tsx` |
| `GET` | `/api/v1/products/{id}/sizes` | Public | Fetch real-time size inventory matrix (`S` to `2XL`) | PDP Size Selector, Admin Matrix |
| `GET` | `/api/v1/categories` | Public | List all storefront categories & department tags | `src/app/categories/page.tsx`, Header Dropdown |
| `GET` | `/api/v1/categories/{slug}` | Public | Retrieve category details and assigned products | `src/app/categories/[slug]/page.tsx` |

### D. Search, Suggestions & Filtering
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/search` | Public | Full-text fuzzy search across titles, clubs & tags | `src/components/storefront/SearchModal.tsx`, `src/app/shop/page.tsx` |
| `GET` | `/api/v1/search/suggestions` | Public | Instant autocomplete suggestions & trending tags | `src/components/storefront/SearchModal.tsx` |
| `GET` | `/api/v1/catalog/filters` | Public | Dynamic facet counts (available clubs, sizes, price bounds) | `src/app/shop/page.tsx` Filter Modal |

### E. Cart, Wishlist & Price Calculation
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/cart/validate` | Public / Guest | Validate live stock availability for items in cart | `src/store/cartStore.ts`, `src/app/cart/page.tsx` |
| `POST` | `/api/v1/cart/quote` | Public / Guest | Calculate live subtotal, taxes, shipping fee & discount | `src/app/checkout/page.tsx`, `src/app/cart/page.tsx` |
| `GET` | `/api/v1/wishlist` | Authenticated | Retrieve customer's saved drop wishlist | `src/app/wishlist/page.tsx` |
| `POST` | `/api/v1/wishlist/{productId}` | Authenticated | Add product to customer wishlist | `src/store/wishlistStore.ts`, PDP Heart Icon |
| `DELETE` | `/api/v1/wishlist/{productId}` | Authenticated | Remove product from customer wishlist | `src/store/wishlistStore.ts` |

### F. Logistics, PIN Code & Serviceability
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/logistics/pincode/{pincode}` | Public | Check 6-digit Indian PIN code delivery & COD eligibility | `src/app/products/[slug]/page.tsx`, Checkout Page |

### G. Coupons & Promotional Engine
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/coupons` | Public | List active public promotional discount vouchers | `src/app/coupons/page.tsx`, Cart Drawer |
| `POST` | `/api/v1/coupons/validate` | Public | Validate coupon code against cart total & items | `src/services/api/index.ts`, Checkout Summary |

### H. Checkout & Payments (UPI, Cards & COD)
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/checkout/orders` | Public / Guest | Create & place order, lock inventory, initialize payment | `src/app/checkout/page.tsx` |
| `GET` | `/api/v1/checkout/upi/config` | Public | Retrieve active merchant VPA, Payee Name & QR settings | `src/app/checkout/page.tsx` |
| `POST` | `/api/v1/checkout/upi/verify-vpa` | Public | Validate format and bank resolution for customer VPA | `src/app/checkout/page.tsx` VPA input |
| `POST` | `/api/v1/checkout/upi/intent` | Public | Generate device-specific deep link for GPay, PhonePe, Paytm | `src/app/checkout/page.tsx` UPI Grid |
| `POST` | `/api/v1/checkout/cod/verify-otp` | Public | Validate delivery confirmation OTP for COD orders | `src/app/checkout/page.tsx` COD Modal |
| `POST` | `/api/v1/checkout/webhook/{gateway}` | Webhook Signature | Payment gateway webhook (Razorpay / Cashfree / NPCI) | External Payment Gateways |

### I. Customer Orders & Live Dispatch Tracking
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/orders` | Customer | Fetch current customer order history | `src/app/orders/page.tsx` |
| `GET` | `/api/v1/orders/{id}` | Public (Masked) / Auth | Retrieve single order details by ID or allocation code | `src/app/order-confirmation/[id]/page.tsx` |
| `GET` | `/api/v1/orders/track/{awbOrId}` | Public | Real-time Bluedart / Delhivery logistics milestone tracking | `src/app/track-order/page.tsx` |

### J. Storefront Content, Reviews & FAQs
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/cms/homepage` | Public | Fetch editorial hero, ticker strips & flash banners | `src/app/page.tsx`, `src/app/admin/banners/page.tsx` |
| `GET` | `/api/v1/reviews` | Public | Retrieve verified customer feedback & star ratings | `src/app/reviews/page.tsx`, `src/app/admin/reviews/page.tsx` |
| `POST` | `/api/v1/reviews` | Customer | Submit new verified buyer review | `src/app/reviews/page.tsx` Modal |
| `GET` | `/api/v1/faqs` | Public | Fetch categorised supporter questions & sizing policies | `src/app/faq/page.tsx` |

### K. Store Configuration & WhatsApp Concierge
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/store/settings/public` | Public | Fetch public store settings (WhatsApp float, currency, brand) | `src/components/storefront/WhatsAppFloat.tsx`, Global Layout |

### L. Admin Backoffice Controller & KPI Analytics
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/kpis` | Admin | Retrieve today's revenue, active shipments, low stock count | `src/app/admin/page.tsx` Dashboard |
| `GET` | `/api/v1/admin/orders` | Admin | List all orders with status filtering & search | `src/app/admin/orders/page.tsx` |
| `PATCH` | `/api/v1/admin/orders/{id}/status` | Admin | Transition order status (`PLACED` -> `PACKED` -> `TRANSIT`) | `src/app/admin/orders/page.tsx` |
| `PATCH` | `/api/v1/admin/orders/{id}/dispatch` | Admin | Assign courier name and AWB tracking code | `src/app/admin/orders/page.tsx` |
| `POST` | `/api/v1/admin/products` | Admin | Create a new catalog product with initial stock & media | `src/app/admin/products/page.tsx` |
| `PUT` | `/api/v1/admin/products/{id}` | Admin | Update product metadata, prices, badges & description | `src/app/admin/products/page.tsx` |
| `DELETE` | `/api/v1/admin/products/{id}` | Admin | Soft-delete product from catalog | `src/app/admin/products/page.tsx` |
| `PATCH` | `/api/v1/admin/inventory/batch` | Admin | Bulk update size stock levels (`S`, `M`, `L`, `XL`, `2XL`) | `src/app/admin/inventory/page.tsx` |
| `PUT` | `/api/v1/admin/cms/homepage` | Admin | Update hero photography, headline text, tickers & flash banner | `src/app/admin/banners/page.tsx` |
| `POST` | `/api/v1/admin/coupons` | Admin | Create new promotional discount voucher | `src/app/admin/coupons/page.tsx` |
| `PATCH` | `/api/v1/admin/coupons/{id}/toggle` | Admin | Pause or activate a coupon voucher | `src/app/admin/coupons/page.tsx` |
| `DELETE` | `/api/v1/admin/reviews/{id}` | Admin | Remove flagged review from storefront | `src/app/admin/reviews/page.tsx` |
| `GET` | `/api/v1/admin/customers` | Admin | List all supporters, total spend, club tiers | `src/app/admin/customers/page.tsx` |
| `GET` | `/api/v1/admin/settings` | Super Admin | Fetch all store settings (WhatsApp, UPI, COD, Brand) | Admin Settings Panel |
| `PUT` | `/api/v1/admin/settings` | Super Admin | Update store settings (WhatsApp number, UPI VPA, COD limits) | Admin Settings Panel |

### M. Media Vault & CDN Assets
| Method | Endpoint | Auth Level | Description | Frontend Consumer |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/media/upload-url` | Admin | Generate presigned S3 / Cloud Storage upload URL | `src/app/admin/media/page.tsx` |
| `POST` | `/api/v1/media/assets` | Admin | Register uploaded media asset with metadata | `src/app/admin/media/page.tsx` |
| `PUT` | `/api/v1/products/{id}/gallery/primary` | Admin | Reassign primary display image for a product | `src/app/admin/media/page.tsx` |
| `DELETE` | `/api/v1/products/{id}/gallery/{assetId}` | Admin | Remove image asset from product gallery | `src/app/admin/media/page.tsx` |
