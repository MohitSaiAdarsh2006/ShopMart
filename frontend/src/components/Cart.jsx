import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Cart.css';

export const Cart = () => {
  const { state, dispatch } = useApp();

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity: newQuantity } });
    }
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!state.user) {
      dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
      return;
    }
    // In a real app, this would redirect to payment processing
    alert('Checkout functionality would be implemented here');
  };

  if (state.cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <ShoppingBag className="cart-empty-icon" />
        <h2 className="cart-empty-title">Your cart is empty</h2>
        <p className="cart-empty-description">Start shopping to add items to your cart</p>
        <button
          onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' })}
          className="cart-empty-button"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-page-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items-section">
          {state.cart.map((item) => (
            <div key={item.product.id} className="cart-item-card">
              <div className="cart-item-content">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <p className="cart-item-description">{item.product.description}</p>
                  <div className="cart-item-price-wrapper">
                    <span className="cart-item-price">₹{item.product.price}</span>
                    {item.product.originalPrice && (
                      <span className="cart-item-original-price">
                        ₹{item.product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="cart-item-quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="cart-quantity-button"
                  >
                    <Minus className="cart-quantity-icon" />
                  </button>
                  
                  <span className="cart-quantity-display">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="cart-quantity-button"
                  >
                    <Plus className="cart-quantity-icon" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product.id)}
                  className="cart-remove-button"
                >
                  <Trash2 className="cart-remove-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary-section">
          <h2 className="cart-summary-title">Order Summary</h2>
          
          <div className="cart-summary-details">
            <div className="cart-summary-row">
              <span className="cart-summary-label">Subtotal</span>
              <span className="cart-summary-value">₹{subtotal}</span>
            </div>
            
            <div className="cart-summary-row">
              <span className="cart-summary-label">Shipping</span>
              <span className="cart-summary-value">
                {shipping === 0 ? 'Free' : `₹${shipping}`}
              </span>
            </div>
            
            {shipping === 0 && subtotal > 500 && (
              <p className="cart-shipping-saved">🎉 You saved ₹40 on shipping!</p>
            )}
            
            <div className="cart-summary-total-row">
              <div className="cart-summary-total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="cart-checkout-button"
          >
            {state.user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
          </button>
          
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' })}
            className="cart-continue-shopping-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};