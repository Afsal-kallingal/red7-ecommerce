# Feature Spec: Order Confirmation & Live Tracking

## Purpose
Provides post-checkout verification, unique Allocation ID, dispatch milestones, vault receipt, and direct WhatsApp courier updates.

## UI Behavior
- **Ticker Strip**: `DROP SECURED // PAN-INDIA EXPRESS AIRLINE LOGISTICS • #FYND-88291`.
- **Hero Confirmed Card**:
  - Green checkmark icon badge.
  - Large display watermark "FYND".
  - Headline: `ORDER CONFIRMED`.
  - Allocation Box: `ALLOCATION ID: #FYND-88291` • `DELIVERY WINDOW: Thursday, by 3:00 PM`.
- **Dispatch Tracker**:
  - Horizontal 4-stage stepper: `PLACED` (Checked) -> `PACKED` -> `TRANSIT` -> `DELIVERED`.
  - Courier status note: `Express 48H Courier: In transit to Kempegowda Logistics Hub`.
- **Vault Receipt**:
  - Item details, unit pricing, zero freight notice, payment method tag (`Google Pay UPI Intent • Ref: UPI/392817264`).
- **Shipping Destination Card**:
  - Recipient name, street address, PIN code, contact phone.
- **Action Buttons**:
  - `TRACK ORDER STATUS` (Primary button).
  - `WHATSAPP ORDER UPDATES` (Direct WhatsApp alert opt-in).
  - `CONTINUE SHOPPING` (Return to catalog).
- **Trust Strip**: 100% Authentic Drop, 7-Day Free Size Exchange, 24/7 Concierge.

## Acceptance Criteria
- Exact reproduction of Stitch Order Confirmed screen.
- Dynamically receives order details from checkout or route parameter `/order-confirmation/[id]`.
