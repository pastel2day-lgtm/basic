import React, { useState } from 'react';
import { CartItem } from '../types';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onCheckout: () => void;
  // Feature flag to simulate dynamic DOM selector changes (Self-Healing demo)
  randomizeSelectors?: boolean;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onUpdateQuantity,
  onCheckout,
  randomizeSelectors = false,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'AX2026') {
      setAppliedDiscount(0.2); // 20% discount
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  // Dynamic selector simulation: classic CSS tests fail if class name shifts!
  const checkoutBtnClass = randomizeSelectors
    ? `btn-action-dynamic-${Math.floor(Math.random() * 1000)}`
    : 'checkout-submit-btn';

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h2>🛒 AI Verified Shopping Cart</h2>
        <span style={badgeStyle}>AX Self-Healing Ready</span>
      </header>

      <div style={itemListStyle}>
        {items.map((item) => (
          <div key={item.id} style={itemRowStyle} data-testid={`cart-item-${item.id}`}>
            <div>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                ${item.price.toLocaleString()} each
              </p>
            </div>
            <div style={qtyControlsStyle}>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                aria-label={`Decrease ${item.name} quantity`}
                style={btnStyle}
              >
                -
              </button>
              <span style={{ fontWeight: 'bold', padding: '0 8px' }}>{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase ${item.name} quantity`}
                style={btnStyle}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={couponSectionStyle}>
        <input
          type="text"
          placeholder="Promo code (e.g. AX2026)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          style={inputStyle}
          data-testid="coupon-input"
        />
        <button onClick={handleApplyCoupon} style={applyBtnStyle}>
          Apply Code
        </button>
      </div>
      {couponError && <p style={{ color: '#ef4444', fontSize: '13px', margin: '4px 0' }}>{couponError}</p>}
      {appliedDiscount > 0 && (
        <p style={{ color: '#10b981', fontSize: '13px', margin: '4px 0' }}>
          🎉 Promo applied! 20% discount saved ${discountAmount.toFixed(2)}
        </p>
      )}

      <hr style={{ margin: '16px 0', borderColor: '#e5e7eb' }} />

      <div style={summaryStyle}>
        <div style={summaryRowStyle}>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {appliedDiscount > 0 && (
          <div style={{ ...summaryRowStyle, color: '#10b981' }}>
            <span>Discount (20%):</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div style={{ ...summaryRowStyle, fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total Amount:</span>
          <span data-testid="cart-total-price">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className={checkoutBtnClass}
        style={checkoutBtnStyle}
      >
        Complete Order & Pay
      </button>
    </div>
  );
};

// Inline CSS Styles
const containerStyle: React.CSSProperties = {
  maxWidth: '480px',
  margin: '20px auto',
  padding: '24px',
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const badgeStyle: React.CSSProperties = {
  backgroundColor: '#e0e7ff',
  color: '#4338ca',
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600',
};

const itemListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const itemRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
};

const qtyControlsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const btnStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  backgroundColor: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const couponSectionStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginTop: '16px',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  fontSize: '14px',
};

const applyBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '6px',
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
};

const summaryStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '20px',
};

const summaryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
};

const checkoutBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: '8px',
  backgroundColor: '#10b981',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};
