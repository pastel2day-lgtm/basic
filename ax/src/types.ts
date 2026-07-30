export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Coupon {
  code: string;
  discountRate: number; // e.g. 0.1 for 10%
}
