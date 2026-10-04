# RED7 Admin Portal & Store Settings Specification
**Version:** 1.0.0  
**Auth Level:** RBAC Restricted (`operations_manager`, `catalog_manager`, `super_admin`)  
**Route Prefix:** `/api/v1/admin`

---

## 1. Executive Summary & Capabilities

The RED7 Admin Portal (`/admin/*`) controls the operational heartbeat of the brand. Every element rendered on the customer-facing storefront can be reconfigured dynamically without redeploying frontend React code or editing TypeScript interfaces.

---

## 2. Dynamic Store Settings (`/admin/settings`)

### 2.1 WhatsApp Concierge Settings
Enables real-time modification of the floating WhatsApp button (`WhatsAppFloat.tsx`), contact page card, and order confirmation alert buttons.

- **Endpoint:** `PUT /api/v1/admin/settings/whatsapp`
- **Auth:** `super_admin`
- **Request Body:**
```json
{
  "phoneNumber": "919876543210",
  "defaultMessage": "Hi RED7 Support, I have an inquiry about my drop order / sizing.",
  "isEnabled": true,
  "supportHours": "10:00 AM - 10:00 PM IST",
  "autoAlertOnOrderPlaced": true
}
```
- **Validation:**
  - `phoneNumber`: Digits only, country code included (e.g. `91...`), min 10 digits.
  - `defaultMessage`: String, 10 to 300 characters.

---

### 2.2 UPI Gateway & QR Settings
Controls the payment credentials rendered in Step 3/3 of checkout (`/checkout`).

- **Endpoint:** `PUT /api/v1/admin/settings/upi`
- **Auth:** `super_admin`
- **Request Body:**
```json
{
  "merchantVpa": "red7official@icici",
  "merchantName": "RED7 FOOTBALL APPAREL",
  "merchantCategoryCode": "5691",
  "staticQrImageUrl": "https://cdn.red7.in/payments/upi-merchant-qr.png",
  "enableGPayIntent": true,
  "enablePhonePeIntent": true,
  "enablePaytmIntent": true,
  "enableBhimIntent": true,
  "intentExpirySeconds": 600
}
```

---

### 2.3 Cash on Delivery (COD) Rules Settings
Controls COD availability, risk thresholds, and geographical serviceability.

- **Endpoint:** `PUT /api/v1/admin/settings/cod`
- **Auth:** `super_admin`
- **Request Body:**
```json
{
  "isEnabled": true,
  "maxOrderValue": 5000.00,
  "requireOtpOnDelivery": true,
  "surchargeAmount": 0.00,
  "blacklistedPincodes": ["110006", "700023"]
}
```

---

## 3. Product Catalog & Variant Management

### 3.1 Create Product
- **Endpoint:** `POST /api/v1/admin/products`
- **Frontend File:** `src/app/admin/products/page.tsx`
- **Request Body (`AdminProductPayload`):**
```json
{
  "title": "Arsenal 26/27 Home Kit Saka",
  "slug": "arsenal-26-27-home-kit-saka",
  "subtitle": "Official Club Specification • Ultra-Breathable Micro-Piqué",
  "category": "football-jerseys",
  "price": 399.00,
  "originalPrice": 449.00,
  "badge": "NEW DROP",
  "description": "Exclusive limited seasonal terrace kit release.",
  "inStock": true,
  "stockCount": 20,
  "imageUrl": "https://cdn.red7.in/products/arsenal-home.jpg",
  "galleryUrls": [
    "https://cdn.red7.in/products/arsenal-home-front.jpg",
    "https://cdn.red7.in/products/arsenal-home-back-saka.jpg",
    "https://cdn.red7.in/products/arsenal-home-crest-detail.jpg",
    "https://cdn.red7.in/products/arsenal-home-lifestyle-model.jpg"
  ],
  "initialSizes": [
    { "size": "S", "stock": 4 },
    { "size": "M", "stock": 6 },
    { "size": "L", "stock": 6 },
    { "size": "XL", "stock": 2 },
    { "size": "2XL", "stock": 2 }
  ]
}
```

---

### 3.2 Update Product & Price
- **Endpoint:** `PUT /api/v1/admin/products/{id}`
- **Request Body:**
```json
{
  "title": "Arsenal 26/27 Home Kit Saka",
  "subtitle": "Official Matchday Replica Edition",
  "price": 379.00,
  "originalPrice": 449.00,
  "badge": "FLASH SALE",
  "description": "Updated product description."
}
```

---

### 3.3 Delete Product (Soft Delete)
- **Endpoint:** `DELETE /api/v1/admin/products/{id}`
- **Response `200 OK`:**
```json
{
  "status": "success",
  "message": "Product archived from live storefront."
}
```

---

## 4. Size Variant Inventory Matrix (`/admin/inventory`)

### 4.1 Update Variant Stock
- **Endpoint:** `PATCH /api/v1/admin/inventory/{productId}/sizes/{size}`
- **Frontend File:** `src/app/admin/inventory/page.tsx`
- **Request Body:**
```json
{
  "delta": 1,
  "exactStock": 7
}
```
- **Response `200 OK`:**
```json
{
  "productId": "prod-rm-away-green",
  "size": "M",
  "updatedStock": 7,
  "totalProductStock": 27,
  "inStock": true
}
```

---

## 5. Media Vault & Multi-Image Gallery Management (`/admin/media`)

### 5.0 Visual Image Architecture: Primary Hero vs. Side-Swipe Gallery
In the RED7 frontend, product imagery is split into two distinct roles:
1. **Primary Showcase Image (`primaryImage` / `isPrimary: true`):**
   - Serves as the main "Hero" image for the product.
   - Displayed across all storefront cards: Home 2-column mobile grid, `/shop` catalog grid, category departments, search modal autocomplete, cart summary, and checkout receipt.
   - Defaults as the very first slide (`Slide 1`) when opening the Product Detail Page (PDP).
2. **Side-Swipe Gallery Images (`gallery: MediaAsset[]`):**
   - Rendered in the PDP interactive media viewer ([src/app/products/[slug]/page.tsx](file:///Users/ebiee/Documents/FYND/frontend/src/app/products/[slug]/page.tsx)).
   - Mobile users can **side-swipe** horizontally through all photos with touch gestures.
   - Includes real-time slide counter pill (`1 / 4`), dot progress indicators, and clickable mini-thumbnails below the hero frame.
   - Can hold unlimited detail shots: back player nameplate, collar detail, badge close-up, and lifestyle model shots.
   - In `/admin/media`, the admin can click **"Set Primary"** on any side-swipe image at any time to instantly promote it to the main card hero image.

### 5.1 Add Single Image to Product Gallery
- **Endpoint:** `POST /api/v1/admin/products/{id}/gallery`
- **Frontend File:** `src/app/admin/media/page.tsx` (`handleAddImage`)
- **Request Body:**
```json
{
  "imageUrl": "https://cdn.red7.in/products/arsenal-back-saka.jpg",
  "alt": "Arsenal Home Kit Saka Back Nameplate",
  "isPrimary": false
}
```
- **Response `201 Created`:**
```json
{
  "assetId": "img-26100588292",
  "url": "https://cdn.red7.in/products/arsenal-back-saka.webp",
  "alt": "Arsenal Home Kit Saka Back Nameplate",
  "isPrimary": false,
  "productId": "prod-arsenal-home-saka"
}
```

### 5.2 Batch Upload Multiple Images to Product Gallery
- **Endpoint:** `POST /api/v1/admin/products/{id}/gallery/batch`
- **Frontend File:** `src/app/admin/media/page.tsx`
- **Request Body:**
```json
{
  "images": [
    {
      "imageUrl": "https://cdn.red7.in/products/arsenal-front.jpg",
      "alt": "Front Flat Lay",
      "isPrimary": true
    },
    {
      "imageUrl": "https://cdn.red7.in/products/arsenal-back.jpg",
      "alt": "Back Player Nameplate",
      "isPrimary": false
    },
    {
      "imageUrl": "https://cdn.red7.in/products/arsenal-badge-detail.jpg",
      "alt": "Silicone Crest Detail",
      "isPrimary": false
    },
    {
      "imageUrl": "https://cdn.red7.in/products/arsenal-model.jpg",
      "alt": "Streetwear Lifestyle Fit",
      "isPrimary": false
    }
  ]
}
```
- **Response `200 OK`:**
```json
{
  "status": "success",
  "addedCount": 4,
  "totalGalleryCount": 5
}
```

### 5.3 Set Primary Showcase Image
- **Endpoint:** `PUT /api/v1/admin/products/{id}/gallery/{assetId}/primary`
- **Frontend File:** `src/app/admin/media/page.tsx` (`handleSetPrimary`)
- **Response `200 OK`:**
```json
{
  "productId": "prod-rm-away-green",
  "primaryImageId": "img-26100588291",
  "message": "Set as primary showcase image across storefront cards."
}
```

### 5.4 Remove Image from Gallery
- **Endpoint:** `DELETE /api/v1/admin/products/{id}/gallery/{assetId}`
- **Frontend File:** `src/app/admin/media/page.tsx` (`handleDeleteImage`)
- **Validation:** A product must retain at least one image asset.

---

## 6. Homepage CMS & Promotional Banners (`/admin/banners`)

### 6.1 Update Homepage Layout & Copy
- **Endpoint:** `PUT /api/v1/admin/cms/homepage`
- **Frontend File:** `src/app/admin/banners/page.tsx`
- **Request Body:**
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
    "imageUrl": "https://cdn.red7.in/banners/hero-model-new.png",
    "desktopImageUrl": "https://cdn.red7.in/banners/hero-widescreen-stadium.png"
  },
  "flashBanner": {
    "badge": "LIMITED TIME DROP OFFER",
    "headline": "BUY 4 KITS, GET 1 FREE STOREWIDE",
    "description": "Mix & match any retro jerseys or club outerwear.",
    "buttonText": "CLAIM FREE DROP",
    "buttonLink": "/shop"
  }
}
```

---

## 7. Order Fulfillment & Dispatch Pipeline (`/admin/orders`)

### 7.1 List Fulfillment Orders
- **Endpoint:** `GET /api/v1/admin/orders`
- **Query Params:** `status` (`PLACED`, `PACKED`, `TRANSIT`, `DELIVERED`, `CANCELLED`), `page`, `limit`.
- **Frontend File:** `src/app/admin/orders/page.tsx`

### 7.2 Update Fulfillment Status
- **Endpoint:** `PATCH /api/v1/admin/orders/{id}/status`
- **Request Body:**
```json
{
  "status": "TRANSIT",
  "statusText": "Package dispatched via Bluedart Air Courier Flight 402",
  "trackingAwb": "BD88291IN",
  "courierName": "Bluedart Express Priority"
}
```

---

## 8. Customer CRM & VIP Supporter Directory (`/admin/customers`)

### 8.1 List Supporter Profiles
- **Endpoint:** `GET /api/v1/admin/customers`
- **Frontend File:** `src/app/admin/customers/page.tsx`
- **Response `200 OK`:**
```json
[
  {
    "id": "cust-1",
    "name": "Rohan Sen",
    "email": "rohan.sen@example.com",
    "phone": "+91 98765 43210",
    "city": "Bengaluru, KA",
    "ordersCount": 4,
    "totalSpent": "₹ 1,596.00",
    "tier": "VIP DROP CLUB",
    "lastOrderDate": "2026-10-04T18:30:00Z"
  }
]
```

---

## 9. Review Moderation & Approvals (`/admin/reviews`)

### 9.1 Delete or Unpublish Review
- **Endpoint:** `DELETE /api/v1/admin/reviews/{id}`
- **Frontend File:** `src/app/admin/reviews/page.tsx`
- **Response `200 OK`:**
```json
{
  "status": "success",
  "message": "Review removed from storefront."
}
```
