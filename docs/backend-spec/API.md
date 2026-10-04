# RED7 Complete Backend API Specification
**Version:** 1.0.0  
**Base URL:** `https://api.red7.in/api/v1` (or `http://localhost:8000/api/v1`)  
**Prefix:** `/api/v1`  
**Data Format:** `application/json` (UTF-8)

---

## 1. Global Request & Response Standards

### 1.1 Headers
All API calls must provide standard headers:
- `Content-Type: application/json` (for POST, PUT, PATCH requests)
- `Accept: application/json`
- `Authorization: Bearer <jwt_access_token>` (for authenticated endpoints)
- `X-Session-ID: <uuid>` (for guest checkout session attribution and cart validation)
- `Idempotency-Key: <uuid>` (mandatory for `/checkout/orders` and payment operations)

### 1.2 Standard RFC 7807 Error Response
Whenever any API call fails with status code `>= 400`, the server returns a uniform error payload:
```json
{
  "type": "https://api.red7.in/errors/invalid_parameters",
  "title": "Validation Error",
  "status": 422,
  "detail": "Field 'phone' must be a valid 10-digit Indian mobile number.",
  "instance": "/api/v1/checkout/orders",
  "invalidParams": [
    {
      "name": "customer.phone",
      "reason": "Pattern regex failed: ^(\\+91)?[6-9]\\d{9}$"
    }
  ],
  "timestamp": "2026-10-05T00:30:00Z"
}
```

---

## 2. Authentication & Customer Identity

### 2.1 Send Phone OTP
- **Method & Route:** `POST /api/v1/auth/otp/send`
- **Auth:** Public
- **Frontend Usage:** `src/app/checkout/page.tsx`, `src/app/account/page.tsx`
- **Request Body:**
```json
{
  "phone": "+919876543210"
}
```
- **Validation:**
  - `phone`: String, required. Must match Indian mobile format `^(\+91)?[6-9]\d{9}$`.
- **Response `200 OK`:**
```json
{
  "status": "success",
  "message": "OTP sent successfully via SMS and WhatsApp.",
  "sessionToken": "otp_sess_a8f92b71c",
  "expiresInSeconds": 300,
  "retryAfterSeconds": 60
}
```
- **Errors:**
  - `400 Bad Request`: Invalid phone syntax.
  - `429 Too Many Requests`: Rate limit exceeded (max 3 OTPs per 10 minutes per IP/phone).

---

### 2.2 Verify Phone OTP
- **Method & Route:** `POST /api/v1/auth/otp/verify`
- **Auth:** Public
- **Frontend Usage:** Customer phone verification at checkout or account login.
- **Request Body:**
```json
{
  "sessionToken": "otp_sess_a8f92b71c",
  "phone": "+919876543210",
  "otp": "482910"
}
```
- **Validation:**
  - `sessionToken`: String, required.
  - `phone`: String, required.
  - `otp`: String, required, 6 digits (`^\d{6}$`).
- **Response `200 OK`:**
```json
{
  "status": "success",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "cust-88291",
    "phone": "+919876543210",
    "name": "Rohan Sen",
    "email": "rohan.sen@example.com",
    "role": "customer",
    "memberTier": "TERRACE VIP DROP CLUB"
  }
}
```
- **Errors:**
  - `401 Unauthorized`: Invalid or expired OTP.
  - `422 Unprocessable Entity`: Malformed payload.

---

### 2.3 Admin Login (Credentials + 2FA)
- **Method & Route:** `POST /api/v1/auth/admin/login`
- **Auth:** Public (Strict rate limiting: 5 attempts per 15 min)
- **Frontend Usage:** `src/app/admin/layout.tsx` / Admin Login Gate
- **Request Body:**
```json
{
  "email": "operations@red7.in",
  "password": "CorrectHorseBatteryStaple123!",
  "totpCode": "829104"
}
```
- **Validation:**
  - `email`: Valid email format.
  - `password`: String, min 8 characters.
  - `totpCode`: Optional if 2FA disabled, 6 digits if enabled.
- **Response `200 OK`:**
```json
{
  "status": "success",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "admin": {
    "id": "adm-01",
    "email": "operations@red7.in",
    "fullName": "RED7 Operations Desk",
    "role": "super_admin",
    "permissions": ["catalog:write", "orders:write", "settings:write", "media:write"]
  }
}
```
- **Headers (Set-Cookie):**
  - `refresh_token=...; HttpOnly; Secure; SameSite=Strict; Path=/api/v1/auth/admin/refresh; Max-Age=604800`

---

### 2.4 Admin Refresh Token
- **Method & Route:** `POST /api/v1/auth/admin/refresh`
- **Auth:** Requires `refresh_token` in HTTP-only cookie.
- **Response `200 OK`:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900
}
```

---

## 3. Product Catalog & Categories

### 3.1 List Products
- **Method & Route:** `GET /api/v1/products`
- **Auth:** Public
- **Frontend Usage:** `src/components/storefront/ProductCatalogSection.tsx`, `src/app/shop/page.tsx`, `src/services/api/index.ts`
- **Query Parameters:**
  - `category` (optional string): e.g. `football-jerseys`, `streetwear`, `sportswear`, `shoes`, `accessories`, `gadgets`.
  - `club` (optional string): e.g. `Real Madrid`, `Barcelona`, `AC Milan`, `Argentina`.
  - `size` (optional string): `S`, `M`, `L`, `XL`, `2XL`.
  - `sort` (optional string): `featured`, `price-low`, `price-high`, `newest`, `best-selling`, `alpha-asc`, `alpha-desc`.
  - `featured` (optional boolean): Filter by editorially featured products.
  - `maxPrice` (optional number): Maximum ceiling price in INR.
  - `query` (optional string): Keyword search query.
  - `page` (optional integer, default `1`): Current page.
  - `limit` (optional integer, default `20`): Items per page.
- **Response `200 OK`:**
```json
{
  "items": [
    {
      "id": "prod-rm-away-green",
      "slug": "real-madrid-2026-27-away-kit-green-bellingham",
      "title": "Real Madrid Away Bellingham #5",
      "shortTitle": "Real Madrid Away",
      "subtitle": "Official Club Specification • Ultra-Breathable Micro-Piqué",
      "category": "football-jerseys",
      "department": "Football Kits",
      "club": "Real Madrid",
      "league": "La Liga",
      "price": 399.00,
      "originalPrice": 2499.00,
      "discountPercent": 84,
      "badge": "DROP #01",
      "dropTag": "AUTH MATCHDAY DROP",
      "inStock": true,
      "stockCount": 26,
      "rating": 4.9,
      "reviewsCount": 184,
      "primaryImage": {
        "id": "rm-away-1",
        "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCzcmsAlpk2EEW-7inr9qGtzJU_DovpJMQdbmX2oT_ecB_Q7HzRHnmo3HUvue-tB0-433YakMkHYSbjw9zqVdjWHEbyrRGFjhaFSApvGUBzRx8D-ogyGv1gw_2vQFjwrDXdpumkzk0QPHxcLkFUbzPrOfeG15y5A1E5ZgkdUVMqn5XEQV5BjGUpOmS4YVgfNhKVlU4fhnYmbIpGYBgPMM2rgzgvUMwGrsLUKgA7hCht-rxcEEy0A37zPQ",
        "alt": "Real Madrid Away Bellingham 26/27",
        "width": 800,
        "height": 1000,
        "isPrimary": true
      },
      "gallery": [
        {
          "id": "rm-away-1",
          "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCzcmsAlpk2EEW-7inr9qGtzJU_DovpJMQdbmX2oT_ecB_Q7HzRHnmo3HUvue-tB0-433YakMkHYSbjw9zqVdjWHEbyrRGFjhaFSApvGUBzRx8D-ogyGv1gw_2vQFjwrDXdpumkzk0QPHxcLkFUbzPrOfeG15y5A1E5ZgkdUVMqn5XEQV5BjGUpOmS4YVgfNhKVlU4fhnYmbIpGYBgPMM2rgzgvUMwGrsLUKgA7hCht-rxcEEy0A37zPQ",
          "alt": "Real Madrid Away Front View",
          "isPrimary": true
        }
      ],
      "sizes": [
        { "size": "S", "label": "38\"", "inStock": true, "stock": 4 },
        { "size": "M", "label": "40\"", "inStock": true, "stock": 8 },
        { "size": "L", "label": "42\"", "inStock": true, "stock": 6 },
        { "size": "XL", "label": "44\"", "inStock": true, "stock": 5 },
        { "size": "2XL", "label": "46\"", "inStock": true, "stock": 3 }
      ],
      "specs": {
        "material": "Recycled Moisture-Wicking Poly",
        "fit": "Standard Athlete Cut",
        "badges": "High Density Woven Silicone Patch",
        "print": "Official Supporter Grade Heat Transfer",
        "origin": "Made in India",
        "weight": "180 GSM"
      },
      "description": "Exclusive limited seasonal terrace kit release crafted for supreme breathability.",
      "featured": true,
      "isNewArrival": true,
      "createdAt": "2026-08-01T10:00:00Z"
    }
  ],
  "total": 409,
  "page": 1,
  "limit": 20,
  "totalPages": 21
}
```

---

### 3.2 Get Product By Slug
- **Method & Route:** `GET /api/v1/products/{slug}`
- **Auth:** Public
- **Frontend Usage:** `src/app/products/[slug]/page.tsx`, `api.getProductBySlug()`
- **Path Parameters:**
  - `slug` (string, required): e.g. `real-madrid-2026-27-away-kit-green-bellingham`
- **Response `200 OK`:** Full `Product` object as documented in `3.1`.
- **Response `404 Not Found`:**
```json
{
  "type": "https://api.red7.in/errors/product_not_found",
  "title": "Product Not Found",
  "status": 404,
  "detail": "No catalog item found matching slug 'unknown-jersey'.",
  "instance": "/api/v1/products/unknown-jersey"
}
```

---

### 3.3 List Storefront Categories
- **Method & Route:** `GET /api/v1/categories`
- **Auth:** Public
- **Frontend Usage:** `src/app/categories/page.tsx`, `api.getCategories()`, Storefront Drawer
- **Response `200 OK`:**
```json
[
  {
    "id": "cat-football-jerseys",
    "slug": "football-jerseys",
    "name": "Football Kits",
    "tagline": "26/27 Matchday Replicas & Retro Grails",
    "itemCount": 240,
    "image": {
      "id": "cat-img-1",
      "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCzcmsAlpk2EEW-7inr9qGtzJU_DovpJMQdbmX2oT_ecB_Q7HzRHnmo3HUvue-tB0-433YakMkHYSbjw9zqVdjWHEbyrRGFjhaFSApvGUBzRx8D-ogyGv1gw_2vQFjwrDXdpumkzk0QPHxcLkFUbzPrOfeG15y5A1E5ZgkdUVMqn5XEQV5BjGUpOmS4YVgfNhKVlU4fhnYmbIpGYBgPMM2rgzgvUMwGrsLUKgA7hCht-rxcEEy0A37zPQ",
      "alt": "Football Kits Category"
    },
    "featured": true
  },
  {
    "id": "cat-streetwear",
    "slug": "streetwear",
    "name": "Streetwear & Hoodies",
    "tagline": "Terrace Culture & Oversized Cuts",
    "itemCount": 85,
    "image": {
      "id": "cat-img-2",
      "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDEj5pB8m...",
      "alt": "Streetwear Category"
    },
    "featured": true
  }
]
```

---

## 4. Search & Suggestions

### 4.1 Search Query Endpoint
- **Method & Route:** `GET /api/v1/search`
- **Auth:** Public
- **Frontend Usage:** `src/components/storefront/SearchModal.tsx`, `src/app/shop/page.tsx?query=...`
- **Query Parameters:**
  - `q` (string, required): Search query string.
  - `limit` (integer, default `10`).
- **Response `200 OK`:**
```json
{
  "query": "Milan",
  "totalMatches": 4,
  "items": [
    {
      "id": "prod-ac-milan-home",
      "slug": "ac-milan-26-27-home-kit",
      "title": "AC Milan 26/27 Home Kit",
      "subtitle": "Rossoneri Authentic Stripes",
      "price": 399.00,
      "originalPrice": 449.00,
      "primaryImage": {
        "id": "img-milan",
        "url": "https://lh3.googleusercontent.com/...",
        "alt": "AC Milan Kit"
      }
    }
  ]
}
```

### 4.2 Trending & Search Suggestions
- **Method & Route:** `GET /api/v1/search/suggestions`
- **Auth:** Public
- **Frontend Usage:** Quick suggestion chips in `SearchModal.tsx`
- **Response `200 OK`:**
```json
{
  "trendingChips": [
    "AC Milan",
    "Argentina Messi",
    "Real Madrid",
    "Streetwear",
    "Pulisic",
    "Retro 42"
  ],
  "recentDrops": [
    { "title": "Real Madrid Away", "slug": "real-madrid-2026-27-away-kit-green-bellingham" },
    { "title": "Arsenal Home Saka", "slug": "arsenal-26-27-home-kit-saka" }
  ]
}
```

---

## 5. Logistics & PIN Code Serviceability

### 5.1 Check Indian PIN Code
- **Method & Route:** `GET /api/v1/logistics/pincode/{pincode}`
- **Auth:** Public
- **Frontend Usage:** `src/app/products/[slug]/page.tsx`, `api.checkPincode()`, Checkout verification
- **Path Parameters:**
  - `pincode` (string, 6 digits): e.g. `560038`
- **Response `200 OK` (Serviceable Hub):**
```json
{
  "pincode": "560038",
  "city": "Bengaluru",
  "state": "Karnataka",
  "serviceable": true,
  "codAvailable": true,
  "estimatedDeliveryText": "Estimated delivery by Thursday, 3:00 PM to Bengaluru",
  "expressAvailable": true,
  "courierPartner": "Bluedart Express Priority",
  "hubCode": "BLR-04"
}
```
- **Response `200 OK` (Unserviceable PIN):**
```json
{
  "pincode": "999999",
  "city": "Unknown",
  "state": "India",
  "serviceable": false,
  "codAvailable": false,
  "estimatedDeliveryText": "Sorry, our logistics partners do not currently service PIN 999999.",
  "expressAvailable": false
}
```

---

## 6. Cart, Coupons & Quotation

### 6.1 Validate Cart Stock
- **Method & Route:** `POST /api/v1/cart/validate`
- **Auth:** Public
- **Frontend Usage:** `src/store/cartStore.ts`, Cart validation before checkout.
- **Request Body:**
```json
{
  "items": [
    {
      "productId": "prod-rm-away-green",
      "size": "M",
      "quantity": 2
    }
  ]
}
```
- **Response `200 OK`:**
```json
{
  "valid": true,
  "issues": [],
  "items": [
    {
      "productId": "prod-rm-away-green",
      "size": "M",
      "requestedQuantity": 2,
      "availableStock": 8,
      "inStock": true,
      "unitPrice": 399.00
    }
  ]
}
```

---

### 6.2 Validate Coupon Voucher
- **Method & Route:** `POST /api/v1/coupons/validate`
- **Auth:** Public
- **Frontend Usage:** `src/app/checkout/page.tsx`, `api.validateCoupon()`
- **Request Body:**
```json
{
  "code": "MADRIDISTA",
  "subtotal": 798.00
}
```
- **Response `200 OK` (Valid):**
```json
{
  "valid": true,
  "code": "MADRIDISTA",
  "discount": 100.00,
  "discountType": "fixed",
  "message": "Extra ₹100 Off applied!",
  "minOrderValue": 500.00
}
```
- **Response `200 OK` (Threshold not met):**
```json
{
  "valid": false,
  "code": "MADRIDISTA",
  "discount": 0.00,
  "message": "Min order value of ₹500 required for this coupon"
}
```

---

### 6.3 List Active Public Coupons
- **Method & Route:** `GET /api/v1/coupons`
- **Auth:** Public
- **Frontend Usage:** `src/app/coupons/page.tsx`, `api.getCoupons()`
- **Response `200 OK`:**
```json
[
  {
    "id": "coup-1",
    "code": "FLASH200",
    "title": "Extra ₹200 Off",
    "discountType": "fixed",
    "discountValue": 200,
    "minOrderValue": 999,
    "description": "Valid on all 26/27 drop kits for orders above ₹999",
    "expiryDate": "2026-12-31",
    "isActive": true
  }
]
```

---

## 7. Checkout & Payments (UPI, Cards & COD)

### 7.1 Create Order & Checkout
- **Method & Route:** `POST /api/v1/checkout/orders`
- **Auth:** Public / Guest (Attributed via `X-Session-ID` or Bearer JWT)
- **Frontend Usage:** `src/app/checkout/page.tsx`, `api.createOrder()`
- **Headers:**
  - `Idempotency-Key: <uuid>` (Mandatory to prevent duplicate debit)
- **Request Body (`CheckoutFormData`):**
```json
{
  "customer": {
    "fullName": "Rohan Sen",
    "phone": "+919876543210",
    "email": "rohan.sen@example.com"
  },
  "shippingAddress": {
    "fullName": "Rohan Sen",
    "phone": "+919876543210",
    "email": "rohan.sen@example.com",
    "addressLine1": "Flat 402, Terrace Court, Indiranagar",
    "addressLine2": "Near 100ft Road",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560038"
  },
  "paymentMethod": "upi_intent",
  "upiApp": "gpay",
  "upiVpa": "rohan@okhdfcbank",
  "couponCode": "FLASH200",
  "items": [
    {
      "productId": "prod-rm-away-green",
      "slug": "real-madrid-2026-27-away-kit-green-bellingham",
      "title": "Real Madrid Away Bellingham #5",
      "subtitle": "M // 40\"",
      "size": "M (UK/IN 40\")",
      "price": 399.00,
      "originalPrice": 2499.00,
      "quantity": 1,
      "image": {
        "id": "rm-away-1",
        "url": "https://lh3.googleusercontent.com/...",
        "alt": "Real Madrid Away Kit"
      }
    }
  ]
}
```
- **Validation Rules:**
  - `customer.fullName`: String, min 2 chars.
  - `customer.phone`: Valid Indian phone regex `^(\+91)?[6-9]\d{9}$`.
  - `shippingAddress.pincode`: Exactly 6 digits, must pass serviceability check.
  - `paymentMethod`: Enum: `['upi_intent', 'upi_vpa', 'card', 'net_banking', 'cod']`.
  - `upiApp`: If `paymentMethod == 'upi_intent'`, must be in `['gpay', 'phonepe', 'paytm', 'bhim']`.
  - `items`: Non-empty array, minimum 1 item.
- **Response `201 Created`:**
```json
{
  "id": "ord-88291",
  "allocationId": "#FYND-88291",
  "createdAt": "2026-10-05T00:30:00Z",
  "status": "PLACED",
  "statusText": "Drop Secured & Prioritized for Airline Dispatch",
  "estimatedDelivery": "Thursday, by 3:00 PM",
  "trackingAwb": "BD88291IN",
  "courierName": "Bluedart Express Priority",
  "subtotal": 399.00,
  "discount": 0.00,
  "deliveryFee": 0.00,
  "total": 399.00,
  "paymentMethod": "GPAY Intent",
  "paymentRef": "UPI/26100588291",
  "shippingAddress": {
    "fullName": "Rohan Sen",
    "phone": "+919876543210",
    "email": "rohan.sen@example.com",
    "addressLine1": "Flat 402, Terrace Court, Indiranagar",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560038"
  },
  "items": [
    {
      "productId": "prod-rm-away-green",
      "slug": "real-madrid-2026-27-away-kit-green-bellingham",
      "title": "Real Madrid Away Bellingham #5",
      "size": "M (UK/IN 40\")",
      "price": 399.00,
      "originalPrice": 2499.00,
      "quantity": 1,
      "image": {
        "id": "rm-away-1",
        "url": "https://lh3.googleusercontent.com/...",
        "alt": "Real Madrid Away Kit"
      }
    }
  ],
  "paymentPayload": {
    "upiIntentUrl": "upi://pay?pa=red7official@icici&pn=RED7%20FOOTBALL%20APPAREL&mc=5691&tid=FYND88291&tr=88291&tn=Drop%20Reservation%20FYND88291&am=399.00&cu=INR",
    "deepLink": "gpay://upi/pay?pa=red7official@icici&pn=RED7...",
    "qrCodeDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "expiresAt": "2026-10-05T00:45:00Z"
  }
}
```

---

### 7.2 Get UPI Configuration & Merchant VPA
- **Method & Route:** `GET /api/v1/checkout/upi/config`
- **Auth:** Public
- **Frontend Usage:** `src/app/checkout/page.tsx`
- **Response `200 OK`:**
```json
{
  "merchantVpa": "red7official@icici",
  "merchantName": "RED7 FOOTBALL APPAREL",
  "merchantCategoryCode": "5691",
  "supportedApps": [
    { "id": "gpay", "name": "Google Pay", "recommended": true },
    { "id": "phonepe", "name": "PhonePe", "recommended": false },
    { "id": "paytm", "name": "Paytm UPI", "recommended": false },
    { "id": "bhim", "name": "BHIM UPI", "recommended": false }
  ],
  "staticQrUrl": "https://cdn.red7.in/payments/upi-merchant-qr.png"
}
```

---

### 7.3 Verify Customer UPI VPA
- **Method & Route:** `POST /api/v1/checkout/upi/verify-vpa`
- **Auth:** Public
- **Frontend Usage:** `handleVerifyVpa` in `src/app/checkout/page.tsx`
- **Request Body:**
```json
{
  "vpa": "rohan@okhdfcbank"
}
```
- **Response `200 OK` (Valid):**
```json
{
  "valid": true,
  "vpa": "rohan@okhdfcbank",
  "customerName": "ROHAN SEN",
  "bankName": "HDFC Bank"
}
```
- **Response `400 Bad Request` (Invalid):**
```json
{
  "valid": false,
  "vpa": "invalidvpa",
  "message": "Invalid VPA handle or bank resolution failed."
}
```

---

## 8. Orders, Tracking & Confirmation

### 8.1 Get Order Details By ID or Allocation ID
- **Method & Route:** `GET /api/v1/orders/{id}`
- **Auth:** Public (Masked) / Customer Authenticated (Unmasked)
- **Frontend Usage:** `src/app/order-confirmation/[id]/page.tsx`, `api.getOrderById()`
- **Path Parameters:**
  - `id`: e.g. `ord-88291` or `FYND-88291` or `88291`.
- **Response `200 OK`:** Matches the `Order` interface from `src/types/order.ts`.

---

### 8.2 Get Customer Order History
- **Method & Route:** `GET /api/v1/orders`
- **Auth:** Customer Bearer Token
- **Frontend Usage:** `src/app/orders/page.tsx`, `api.getOrders()`
- **Response `200 OK`:** Array of `Order` objects.

---

### 8.3 Live Courier Milestone Tracking
- **Method & Route:** `GET /api/v1/orders/track/{awbOrId}`
- **Auth:** Public
- **Frontend Usage:** `src/app/track-order/page.tsx`
- **Response `200 OK`:**
```json
{
  "orderId": "ord-88291",
  "allocationId": "#FYND-88291",
  "courier": "Bluedart Express Priority",
  "awb": "BD88291IN",
  "origin": "RED7 National Fulfillment Hub, BLR",
  "destination": "Indiranagar, Bengaluru (560038)",
  "currentStatus": "TRANSIT",
  "estimatedDelivery": "Thursday, by 3:00 PM",
  "timeline": [
    {
      "title": "Drop Order Confirmed",
      "timestamp": "2026-10-05T00:30:00Z",
      "completed": true,
      "description": "Payment secured via GPay. Order passed to allocation queue."
    },
    {
      "title": "Verified & Packed",
      "timestamp": "2026-10-05T04:15:00Z",
      "completed": true,
      "description": "Garment quality-checked and packaged in custom RED7 poly-bag."
    },
    {
      "title": "Airlift Dispatched (In Transit)",
      "timestamp": "2026-10-05T07:45:00Z",
      "completed": true,
      "description": "Package boarded Bluedart Air Courier Flight 402."
    },
    {
      "title": "Out For Delivery",
      "timestamp": null,
      "completed": false,
      "description": "Expected delivery rider allocation at Indiranagar local hub."
    },
    {
      "title": "Delivered",
      "timestamp": null,
      "completed": false,
      "description": "Doorstep delivery to supporter."
    }
  ]
}
```

---

## 9. Content, Reviews & Homepage CMS

### 9.1 Get Homepage CMS
- **Method & Route:** `GET /api/v1/cms/homepage`
- **Auth:** Public
- **Frontend Usage:** `src/app/page.tsx`, `api.getHomepageCms()`, `src/app/admin/banners/page.tsx`
- **Response `200 OK`:**
```json
{
  "hero": {
    "dropBadge": "RETRO DROP // 26/27 SEASON",
    "headline": "AUTHENTIC MATCHDAY RETRO KITS",
    "subheadline": "Precision stitched fan & supporter replicas. Pan-India express dispatch within 48 hours.",
    "ctaPrimaryText": "EXPLORE KITS",
    "ctaPrimaryLink": "/shop",
    "ctaSecondaryText": "VIEW DROPS",
    "ctaSecondaryLink": "/shop?sort=newest",
    "image": {
      "id": "hero-landing-mobile",
      "url": "/images/hero-reference.png",
      "alt": "RED7 Football Kit Lifestyle Model",
      "width": 1080,
      "height": 1440,
      "isPrimary": true
    },
    "desktopImage": {
      "id": "hero-landing-desktop",
      "url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCzcmsAlpk2EEW-7inr9qGtzJU_DovpJMQdbmX2oT_ecB_Q7HzRHnmo3HUvue-tB0-433YakMkHYSbjw9zqVdjWHEbyrRGFjhaFSApvGUBzRx8D-ogyGv1gw_2vQFjwrDXdpumkzk0QPHxcLkFUbzPrOfeG15y5A1E5ZgkdUVMqn5XEQV5BjGUpOmS4YVgfNhKVlU4fhnYmbIpGYBgPMM2rgzgvUMwGrsLUKgA7hCht-rxcEEy0A37zPQ",
      "alt": "RED7 Widescreen Stadium Drop",
      "width": 1920,
      "height": 720
    }
  },
  "tickerStrip": [
    { "id": "t-1", "text": "PAN-INDIA 48H DISPATCH // 100% SUPPORTER REPLICAS", "isHighlight": false },
    { "id": "t-2", "text": "BUY 4 GET 1 FREE STOREWIDE", "isHighlight": true },
    { "id": "t-3", "text": "7-DAY DOORSTEP SIZE EXCHANGE", "isHighlight": false }
  ],
  "lifestyleBanners": [
    {
      "id": "b-1",
      "title": "THE REAL MADRID RETRO COLLECTION",
      "link": "/shop?club=Real+Madrid",
      "image": {
        "id": "banner-rm",
        "url": "https://lh3.googleusercontent.com/...",
        "alt": "Real Madrid Banners"
      }
    },
    {
      "id": "b-2",
      "title": "STREETWEAR & OVERSIZED HOODIES",
      "link": "/shop?category=streetwear",
      "image": {
        "id": "banner-sw",
        "url": "https://lh3.googleusercontent.com/...",
        "alt": "Streetwear Banners"
      }
    }
  ],
  "flashBanner": {
    "badge": "LIMITED TIME DROP OFFER",
    "headline": "BUY 4 KITS, GET 1 FREE STOREWIDE",
    "description": "Mix & match any retro jerseys, modern matchday kits, or club outerwear. Automatically applied at checkout.",
    "buttonText": "CLAIM FREE DROP",
    "buttonLink": "/shop"
  }
}
```

---

### 9.2 Customer Reviews
- **Method & Route:** `GET /api/v1/reviews`
- **Auth:** Public
- **Frontend Usage:** `src/app/reviews/page.tsx`, `api.getReviews()`
- **Response `200 OK`:**
```json
[
  {
    "id": "rev-1",
    "author": "Karan M.",
    "location": "Bengaluru",
    "rating": 5,
    "comment": "The quality of the AC Milan kit is unbelievable for ₹399. Stitching is razor sharp and badge detailing is top tier.",
    "productName": "AC Milan 26/27 Home Kit",
    "verifiedBuyer": true,
    "date": "2 days ago"
  }
]
```

---

### 9.3 Submit Customer Review
- **Method & Route:** `POST /api/v1/reviews`
- **Auth:** Customer Bearer Token
- **Frontend Usage:** `api.submitReview()` in Reviews page
- **Request Body:**
```json
{
  "author": "Tanmay Varma",
  "location": "Delhi NCR",
  "rating": 5,
  "comment": "Fastest shipping ever. Ordered Tuesday night, arrived Thursday 2 PM.",
  "productName": "Real Madrid Away Bellingham #5"
}
```
- **Response `201 Created`:** Created review item with `id`, `verifiedBuyer: true`, `date: "Just now"`.

---

### 9.4 Frequently Asked Questions (FAQs)
- **Method & Route:** `GET /api/v1/faqs`
- **Auth:** Public
- **Frontend Usage:** `src/app/faq/page.tsx`, `api.getFaqs()`
- **Response `200 OK`:**
```json
[
  {
    "id": "faq-1",
    "category": "shipping",
    "question": "How long does delivery take across India?",
    "answer": "All orders are prioritized through Bluedart Air and Delhivery Express. Metro cities receive delivery in 24-48 hours. Rest of India takes 3-4 working days."
  }
]
```

---

## 10. Store Settings & WhatsApp Concierge

### 10.1 Public Store Settings
- **Method & Route:** `GET /api/v1/store/settings/public`
- **Auth:** Public
- **Frontend Usage:** `src/components/storefront/WhatsAppFloat.tsx`, Footer
- **Response `200 OK`:**
```json
{
  "storeName": "RED7",
  "brandTagline": "Retro Football Kits & Streetwear Apparel",
  "currency": "INR",
  "currencySymbol": "₹",
  "whatsapp": {
    "phoneNumber": "919876543210",
    "defaultMessage": "Hi RED7 Support, I have an inquiry about my drop order / sizing.",
    "isEnabled": true,
    "supportHours": "10:00 AM - 10:00 PM IST"
  },
  "cod": {
    "isEnabled": true,
    "maxOrderValue": 5000.00
  },
  "shipping": {
    "freeDeliveryThreshold": 0.00,
    "standardDeliveryFee": 0.00
  }
}
```

---

## 11. Admin Backoffice Controller & KPIs

### 11.1 Admin KPI Metrics
- **Method & Route:** `GET /api/v1/admin/kpis`
- **Auth:** Admin
- **Frontend Usage:** `src/app/admin/page.tsx`, `api.getAdminKpis()`
- **Response `200 OK`:**
```json
{
  "todayRevenue": 42990,
  "totalOrders": 384,
  "activeShipments": 46,
  "lowStockItemsCount": 3,
  "averageOrderValue": 798,
  "conversionRate": 3.4
}
```

---

### 11.2 Add Catalog Product
- **Method & Route:** `POST /api/v1/admin/products`
- **Auth:** Admin
- **Frontend Usage:** `src/app/admin/products/page.tsx`, `api.addProduct()`
- **Request Body (`AdminProductPayload`):**
```json
{
  "title": "Arsenal 26/27 Home Kit Saka",
  "slug": "arsenal-26-27-home-kit-saka",
  "subtitle": "Official Club Specification",
  "category": "football-jerseys",
  "price": 399.00,
  "originalPrice": 449.00,
  "badge": "NEW DROP",
  "inStock": true,
  "stockCount": 20,
  "imageUrl": "https://cdn.red7.in/products/arsenal-home.jpg",
  "galleryUrls": [
    "https://cdn.red7.in/products/arsenal-home-front.jpg",
    "https://cdn.red7.in/products/arsenal-home-back-saka.jpg",
    "https://cdn.red7.in/products/arsenal-home-crest-detail.jpg"
  ],
  "description": "Official supporter cut terrace jersey."
}
```
- **Response `201 Created`:** Full created `Product` object.

---

### 11.3 Update Product Details
- **Method & Route:** `PUT /api/v1/admin/products/{id}`
- **Auth:** Admin
- **Frontend Usage:** `api.updateProduct(id, updates)` in admin products/inventory/media
- **Request Body:** Partial `Product` object.
- **Response `200 OK`:** Updated `Product` object.

---

### 11.4 Batch Variant Inventory Updates
- **Method & Route:** `PATCH /api/v1/admin/inventory/batch`
- **Auth:** Admin
- **Frontend Usage:** `src/app/admin/inventory/page.tsx`
- **Request Body:**
```json
{
  "updates": [
    {
      "productId": "prod-rm-away-green",
      "sizes": [
        { "size": "S", "stock": 5 },
        { "size": "M", "stock": 9 },
        { "size": "L", "stock": 7 },
        { "size": "XL", "stock": 6 },
        { "size": "2XL", "stock": 4 }
      ]
    }
  ]
}
```
- **Response `200 OK`:**
```json
{
  "status": "success",
  "updatedCount": 1
}
```

---

### 11.5 Update Homepage CMS Banners
- **Method & Route:** `PUT /api/v1/admin/cms/homepage`
- **Auth:** Admin
- **Frontend Usage:** `src/app/admin/banners/page.tsx`, `api.updateHomepageCms()`
- **Request Body:** Partial `HomepageCms` payload.
- **Response `200 OK`:** Updated `HomepageCms` payload.

---

### 11.6 Update Order Fulfillment Status
- **Method & Route:** `PATCH /api/v1/admin/orders/{id}/status`
- **Auth:** Admin
- **Frontend Usage:** `src/app/admin/orders/page.tsx`, `api.updateOrderStatus()`
- **Request Body:**
```json
{
  "status": "PACKED"
}
```
- **Validation:** Must be in `['PLACED', 'PACKED', 'TRANSIT', 'DELIVERED', 'CANCELLED']`.
- **Response `200 OK`:** Updated `Order` object.

---

### 11.7 Update Master Store Settings (Admin)
- **Method & Route:** `PUT /api/v1/admin/settings`
- **Auth:** Super Admin
- **Request Body:**
```json
{
  "whatsapp": {
    "phoneNumber": "919876543210",
    "defaultMessage": "Hi RED7 Support, I have an inquiry about my drop order / sizing.",
    "isEnabled": true
  },
  "upi": {
    "merchantVpa": "red7official@icici",
    "merchantName": "RED7 FOOTBALL APPAREL",
    "staticQrUrl": "https://cdn.red7.in/payments/upi-merchant-qr.png"
  },
  "cod": {
    "isEnabled": true,
    "maxOrderValue": 5000.00,
    "requireOtp": true
  }
}
```
- **Response `200 OK`:**
```json
{
  "status": "success",
  "message": "Store settings updated successfully. Cache invalidated across edges."
}
```

---

### 11.8 Add Single / Batch Images to Product Gallery
- **Method & Route:** `POST /api/v1/admin/products/{id}/gallery`
- **Auth:** Admin
- **Frontend Usage:** `src/app/admin/media/page.tsx` (`handleAddImage`)
- **Request Body:**
```json
{
  "imageUrl": "https://cdn.red7.in/products/arsenal-home-back.jpg",
  "alt": "Arsenal Home Kit Saka Back View",
  "isPrimary": false
}
```
- **Response `201 Created`:**
```json
{
  "assetId": "img-26100588292",
  "url": "https://cdn.red7.in/products/arsenal-home-back.webp",
  "alt": "Arsenal Home Kit Saka Back View",
  "isPrimary": false,
  "productId": "prod-arsenal-home-saka"
}
```

---

### 11.9 Set Primary Showcase Image
- **Method & Route:** `PUT /api/v1/admin/products/{id}/gallery/{assetId}/primary`
- **Auth:** Admin
- **Frontend Usage:** `src/app/admin/media/page.tsx` (`handleSetPrimary`)
- **Response `200 OK`:**
```json
{
  "productId": "prod-arsenal-home-saka",
  "primaryImageId": "img-26100588292",
  "message": "Primary showcase image updated successfully."
}
```

---

### 11.10 Remove Image from Product Gallery
- **Method & Route:** `DELETE /api/v1/admin/products/{id}/gallery/{assetId}`
- **Auth:** Admin
- **Frontend Usage:** `src/app/admin/media/page.tsx` (`handleDeleteImage`)
- **Response `200 OK`:**
```json
{
  "status": "success",
  "message": "Image asset removed from product gallery."
}
```
