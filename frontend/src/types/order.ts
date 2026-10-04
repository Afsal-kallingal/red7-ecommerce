import { MediaAsset } from './media';

export type OrderStatus = 'PLACED' | 'PACKED' | 'TRANSIT' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  productId: string;
  slug: string;
  title: string;
  subtitle?: string;
  size: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: MediaAsset;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  allocationId: string; // e.g. #FYND-88291
  createdAt: string;
  status: OrderStatus;
  statusText: string;
  estimatedDelivery: string;
  trackingAwb?: string;
  courierName?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentRef: string;
  shippingAddress: ShippingAddress;
}
