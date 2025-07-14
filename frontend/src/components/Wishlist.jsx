import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import './Wishlist.css';

export const Wishlist = () => {
  const { state, dispatch } = useApp();

  const wishlistProducts = products.filter(product =>
    state.wishlist.includes(product.id)
  );

  const handleRemoveFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const handleAddToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleViewProduct = (productId) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: productId });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: `product-${productId}` });
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="wishlist-empty-container">
        <Heart className="wishlist-empty-icon" />
        <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
        <p className="wishlist-empty-text">Save items you love to your wishlist</p>
        <button
          onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' })}
          className="wishlist-continue-shopping-btn"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-item-count">{wishlistProducts.length} items</p>
      </div>

      <div className="wishlist-grid">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="wishlist-product-card">
            <div className="wishlist-product-image-container">
              <img
                src={product.images[0]}
                alt={product.name}
                className="wishlist-product-image"
                onClick={() => handleViewProduct(product.id)}
              />
              {product.originalPrice && (
                <div className="wishlist-discount-badge">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="wishlist-remove-btn"
              >
                <Trash2 className="wishlist-icon-xs" />
              </button>
            </div>

            <div className="wishlist-product-content">
              <h3
                className="wishlist-product-name"
                onClick={() => handleViewProduct(product.id)}
              >
                {product.name}
              </h3>
              <p className="wishlist-product-brand">by {product.brand}</p>

              <div className="wishlist-product-price-container">
                <div className="wishlist-price-wrapper">
                  <span className="wishlist-product-price">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="wishlist-product-original-price">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={!product.inStock}
                className={product.inStock ? 'wishlist-add-to-cart-btn' : 'wishlist-add-to-cart-btn-disabled'}
              >
                <ShoppingCart className="wishlist-icon-xs" />
                <span className="wishlist-add-to-cart-text">{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};