import { describe, it, expect } from 'vitest';
import { CartItem } from '../../src/types';

function calculateCartTotal(items: CartItem[], discountRate: number = 0): { subtotal: number; discount: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * discountRate;
  const total = subtotal - discount;
  return { subtotal, discount, total };
}

describe('Cart Business Logic Unit Tests', () => {
  const mockItems: CartItem[] = [
    { id: '1', name: 'Earbuds', price: 100, quantity: 2, category: 'Electronics' },
    { id: '2', name: 'Keyboard', price: 50, quantity: 1, category: 'Accessories' },
  ];

  it('calculates subtotal correctly without promo code', () => {
    const result = calculateCartTotal(mockItems);
    expect(result.subtotal).toBe(250);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(250);
  });

  it('applies 20% discount rate accurately', () => {
    const result = calculateCartTotal(mockItems, 0.2);
    expect(result.subtotal).toBe(250);
    expect(result.discount).toBe(50);
    expect(result.total).toBe(200);
  });

  it('handles empty cart gracefully', () => {
    const result = calculateCartTotal([]);
    expect(result.total).toBe(0);
  });
});
