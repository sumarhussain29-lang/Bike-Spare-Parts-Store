export interface SparePart {
  id: number;
  title: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  stock: number;
  compatibility: string;
  rating: number;
  reviewsCount: number;
  popularity: number;
  sku: string;
  imageUrl: string;
  imageAlt: string;
  oemTag?: string;
  description?: string;
  specs?: Record<string, string>;
  isGuaranteedOem?: boolean;
}

export interface CartItem {
  part: SparePart;
  quantity: number;
  selected: boolean;
}

export interface OrderItem {
  partId: number;
  title: string;
  sku: string;
  compatibility: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'cod' | 'wallet' | 'bank' | 'card';
  status: 'Processing' | 'Dispatched via TCS' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
  shippingAddress: string;
  phone: string;
  customerName: string;
}

export type AppScreen = 'home' | 'categories' | 'cart' | 'checkout' | 'orders' | 'profile';
