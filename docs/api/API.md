# FYND FastAPI Backend Contract Specification

This document defines the REST API contract for the future FastAPI backend. All frontend services in `/src/services/` strictly adhere to these request/response schemas.

Base URL: `/api/v1`

---

## 1. Authentication (`/auth`)

### `POST /auth/register`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "full_name": "Rohan Sen",
    "phone": "+919876543210"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "access_token": "jwt_token_string",
    "token_type": "bearer",
    "user": {
      "id": "usr_9921",
      "email": "user@example.com",
      "full_name": "Rohan Sen",
      "phone": "+919876543210",
      "role": "customer"
    }
  }
  ```

### `POST /auth/login`
- **Request Body**: Form urlencoded or JSON with `username` (email/phone) and `password`.

### `GET /auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**: User profile object.

---

## 2. Products & Catalog (`/products`)

### `GET /products`
- **Query Params**:
  - `page`: int (default: 1)
  - `limit`: int (default: 20)
  - `category`: string (e.g. `football-jerseys`, `sportswear`)
  - `club`: string (e.g. `real-madrid`, `barcelona`)
  - `size`: string (e.g. `S,M,L,XL`)
  - `sort`: string (`relevant`, `price-low`, `price-high`, `newest`)
  - `query`: string (search term)
  - `max_price`: float
- **Response (200 OK)**:
  ```json
  {
    "items": [
      {
        "id": "prod_rm_away_26",
        "slug": "real-madrid-2026-27-away-kit-green-bellingham",
        "title": "REAL MADRID 2026/27 AWAY KIT GREEN BELLINGHAM #5",
        "short_title": "Real Madrid Away Bellingham",
        "subtitle": "Official Club Specification • Ultra-Breathable Aeroready Micro-Piqué",
        "category": "football-jerseys",
        "department": "Football Kits",
        "club": "Real Madrid",
        "league": "La Liga",
        "price": 399.00,
        "original_price": 449.00,
        "discount_percent": 11,
        "badge": "-11% OFF",
        "drop_tag": "DROP #01",
        "in_stock": true,
        "stock_count": 4,
        "rating": 4.9,
        "reviews_count": 128,
        "primary_image": {
          "id": "img_01",
          "url": "https://cdn.fynd.in/products/rm-away-front.webp",
          "alt": "Real Madrid 26/27 Away Kit Green front view"
        },
        "gallery": [
          { "id": "img_01", "url": "https://cdn.fynd.in/products/rm-away-front.webp", "alt": "Front view" },
          { "id": "img_02", "url": "https://cdn.fynd.in/products/rm-away-back.webp", "alt": "Back Bellingham #5" },
          { "id": "img_03", "url": "https://cdn.fynd.in/products/rm-away-badge.webp", "alt": "Crest detail" },
          { "id": "img_04", "url": "https://cdn.fynd.in/products/rm-away-model.webp", "alt": "Lookbook model" }
        ],
        "sizes": [
          { "size": "S", "label": "38\"", "in_stock": true, "stock": 8 },
          { "size": "M", "label": "40\"", "in_stock": true, "stock": 4 },
          { "size": "L", "label": "42\"", "in_stock": true, "stock": 12 },
          { "size": "XL", "label": "44\"", "in_stock": true, "stock": 6 },
          { "size": "2XL", "label": "46\"", "in_stock": true, "stock": 2 }
        ],
        "specs": {
          "material": "100% Recycled Aeroready Poly",
          "fit": "Tailored Athletic Drop Cut",
          "badges": "High-Density Heat-Transfer Crest",
          "print": "Bellingham #5 Official Typography"
        },
        "description": "Celebrate Jude Bellingham’s commanding presence with the 2026/27 Real Madrid Away Kit...",
        "created_at": "2026-08-15T10:00:00Z"
      }
    ],
    "total": 85,
    "page": 1,
    "total_pages": 5
  }
  ```

### `GET /products/{slug}`
- Returns complete single product payload with sizes, specs, and gallery.

---

## 3. Categories & Navigation (`/categories`)

### `GET /categories`
- Returns hierarchical list: `id`, `name`, `slug`, `image`, `item_count`, `featured`.

---

## 4. Media & Image Vault (`/media`)

### `POST /media/upload` (Admin / CDN)
- **Multipart Form**: `file`, `category`, `alt_text`
- **Response**: `{ "id": "med_123", "url": "https://cdn.fynd.in/uploads/...", "alt": "..." }`

---

## 5. Indian Logistics & PIN Code Checker (`/logistics`)

### `GET /logistics/pincode/{pincode}`
- **Response (200 OK)**:
  ```json
  {
    "pincode": "560001",
    "city": "Bengaluru",
    "state": "Karnataka",
    "serviceable": true,
    "cod_available": true,
    "estimated_delivery_days": 2,
    "estimated_date": "Thursday, 3:00 PM",
    "express_available": true
  }
  ```

---

## 6. Cart & Wishlist Synchronization (`/cart`, `/wishlist`)

- `POST /cart/validate`: Validates current items, price spikes, and stock locks.
- `GET /wishlist`: Returns saved product items.
- `POST /wishlist/toggle`: Toggles saved status `{ "product_id": "...", "saved": true }`.

---

## 7. Checkout & Payments Engine (`/checkout`, `/payment`)

### `POST /checkout/initialize`
- **Request Body**:
  ```json
  {
    "customer": {
      "full_name": "Rohan Sen",
      "phone": "+919876543210",
      "email": "rohan@example.com"
    },
    "shipping_address": {
      "address_line1": "Flat 402, Terrace Court",
      "address_line2": "Indiranagar",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560038"
    },
    "items": [
      {
        "product_id": "prod_rm_away_26",
        "size": "M",
        "quantity": 1
      }
    ],
    "coupon_code": "MADRIDISTA"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "order_id": "ord_88291",
    "allocation_id": "#FYND-88291",
    "subtotal": 399.00,
    "shipping": 0.00,
    "discount": 0.00,
    "total": 399.00,
    "currency": "INR",
    "reservation_expires_at": "2026-10-02T00:15:00Z"
  }
  ```

### `POST /payment/upi-intent`
- Generates native UPI intent links (`gpay://`, `phonepe://`, `paytmmp://`, `upi://pay?...`).
- **Response**:
  ```json
  {
    "order_id": "ord_88291",
    "upi_intent_uri": "upi://pay?pa=fyndapparel@okhdfcbank&pn=FYND%20Apparel&tr=ord_88291&am=399.00&cu=INR",
    "gpay_deep_link": "gpay://upi/pay?...",
    "phonepe_deep_link": "phonepe://pay?...",
    "paytm_deep_link": "paytmmp://pay?..."
  }
  ```

### `POST /payment/verify`
- Verifies HMAC-SHA256 signature for Razorpay / Cashfree or UPI callback confirmation.

---

## 8. Orders & Logistics Tracking (`/orders`)

### `GET /orders/{order_id}`
- **Response**: Order receipt, item breakdown, allocation ID, live fulfillment timeline (`PLACED` -> `PACKED` -> `TRANSIT` -> `DELIVERED`), courier AWB tracking.

### `GET /orders`
- Returns authenticated customer order history.

---

## 9. Coupons Engine (`/coupons`)

### `POST /coupons/apply`
- **Request**: `{ "code": "BUY4GET1", "cart_subtotal": 1596.00, "item_count": 4 }`
- **Response**: `{ "valid": true, "discount": 399.00, "message": "Buy 4 Get 1 Free applied!" }`

---

## 10. Reviews Engine (`/reviews`)

- `GET /reviews`: List verified buyer reviews with rating histogram.
- `POST /reviews`: Submit a verified review.

---

## 11. Admin Endpoints (`/admin/...`)

- `GET /admin/dashboard`: Metrics (Revenue, Daily Orders, AOV, Low Stock Alerts).
- `GET/POST/PUT/DELETE /admin/products`: Product catalog CRUD, variant stock editor.
- `GET/PUT /admin/orders`: Order status management (`packed`, `dispatched`, `delivered`).
- `GET/POST/DELETE /admin/coupons`: Coupon rules.
- `GET/PUT /admin/homepage-cms`: Featured hero banner, promotional ticker texts, department cards.
