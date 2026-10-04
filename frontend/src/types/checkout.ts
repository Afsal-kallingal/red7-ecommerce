import { ShippingAddress } from './order';

export type PaymentMethodType = 'upi_intent' | 'upi_vpa' | 'card' | 'net_banking' | 'cod';

export type UpiApp = 'gpay' | 'phonepe' | 'paytm' | 'bhim';

export interface CheckoutFormData {
  customer: {
    fullName: string;
    phone: string;
    email: string;
  };
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  upiApp?: UpiApp;
  upiVpa?: string;
  couponCode?: string;
}

export interface PincodeCheckResult {
  pincode: string;
  city: string;
  state: string;
  serviceable: boolean;
  codAvailable: boolean;
  estimatedDeliveryText: string;
  expressAvailable: boolean;
}
