# Feature Spec: 3-Step Checkout & UPI Intent Engine

## Purpose
Indian e-commerce checkout optimized for high completion rates via instant UPI intent (GPay, PhonePe, Paytm, BHIM), Indian address collection, and COD verification.

## UI Behavior
- **Header**: Back button, Step indicator (`Step 3/3: Payment`), 256-Bit SSL security badge.
- **Urgency Reservation Ticker**: `DROP RESERVATION: 07:42 REMAINING • STEP 3/3`.
- **Order Summary Ticket**:
  - Folded kit thumbnail with `AUTH DROP` ribbon.
  - Kit title, size, quantity, strike-through MRP, discount badge.
  - Itemized receipt: Cart Subtotal, Express Terrace Delivery (FREE), Total Payable.
- **Primary Payment Module: UPI**:
  - `0% GATEWAY FEE` & `RECOMMENDED` badges.
  - UPI App Intent Matrix (2x2 grid):
    - **GPAY**: Google Pay with `FASTEST INTENT` badge.
    - **PHONEPE**: PhonePe with `DIRECT BANK` badge.
    - **PAYTM**: Paytm Wallet / UPI with `ONE CLICK` badge.
    - **BHIM / ANY**: NPCI Network universal handler.
  - VPA / UPI ID Manual Form (`username@upi`) with validation indicator.
- **Secondary Payment Options**:
  - Expandable accordions for Credit/Debit Cards, Net Banking, and Cash On Delivery (COD).
- **Payment Processing Modal**:
  - Simulated high-fidelity UPI authorization spinner with auto-redirection upon verification.

## Acceptance Criteria
- Matches Stitch Checkout screen layout, colors, and badge positioning.
- Supports switching payment modes and inputting valid Indian shipping addresses.
