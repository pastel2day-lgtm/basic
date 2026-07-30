import React, { useState } from 'react';
import { ShoppingCart } from './components/ShoppingCart';
import { CartItem } from './types';

export function App() {
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', name: 'Smart AI Earbuds Pro', price: 149.99, quantity: 1, category: 'Electronics' },
    { id: '2', name: 'Ergonomic Mechanical Keyboard', price: 199.00, quantity: 1, category: 'Accessories' },
  ]);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [randomizeSelectors, setRandomizeSelectors] = useState(false);

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#1f2937', marginBottom: '8px' }}>AX (AI Verification) Demo Application</h1>
        <p style={{ color: '#4b5563', maxWidth: '600px', margin: '0 auto 16px' }}>
          This app demonstrates how AI-to-AI Self-Healing E2E tests maintain reliability even when CSS class names or DOM structures fluctuate!
        </p>

        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#fff', padding: '8px 16px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <input
            type="checkbox"
            checked={randomizeSelectors}
            onChange={(e) => setRandomizeSelectors(e.target.checked)}
          />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            ⚡ Simulate Dynamic Class Names (Breaks Playwright, Stagehand Heals It!)
          </span>
        </label>
      </div>

      {orderCompleted ? (
        <div style={{ maxWidth: '480px', margin: '20px auto', padding: '32px', background: '#fff', borderRadius: '16px', textAlign: 'center' }}>
          <h2>🎉 Payment Successful!</h2>
          <p>Your AI-verified order has been processed.</p>
          <button
            onClick={() => setOrderCompleted(false)}
            style={{ padding: '8px 16px', borderRadius: '6px', background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Shop Again
          </button>
        </div>
      ) : (
        <ShoppingCart
          items={items}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={() => setOrderCompleted(true)}
          randomizeSelectors={randomizeSelectors}
        />
      )}
    </div>
  );
}

export default App;
