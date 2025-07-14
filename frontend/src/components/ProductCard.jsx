import React from 'react';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateHealthAlerts, getAlertColor, getAlertIcon } from '../utils/healthAlerts';
import './ProductCard.css';

export const ProductCard = ({ product, onClick, viewMode = 'grid' }) => {
  const { state, dispatch } = useApp();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (state.wishlist.includes(product.id)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product.id });
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: product.id });
    onClick?.();
  };

  const healthAlerts = generateHealthAlerts(product, state.user);
  const isInWishlist = state.wishlist.includes(product.id);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <div className="product-card-list-container">
        <div className="product-card-list-image-section">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-card-list-image"
          />
          {discountPercentage > 0 && (
            <div className="product-card-discount-badge">
              {discountPercentage}% OFF
            </div>
          )}
          {!product.inStock && (
            <div className="product-card-out-of-stock-overlay">
              <span className="product-card-out-of-stock-text">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="product-card-list-content">
          {/* Health Alerts */}
          {state.showHealthAlerts && healthAlerts.length > 0 && (
            <div className="product-card-health-alerts">
              {healthAlerts.slice(0, 1).map((alert, index) => (
                <div key={index} className={`product-card-health-alert ${getAlertColor(alert)}`}>
                  <span className="product-card-health-alert-icon">{getAlertIcon(alert)}</span>
                  <div className="product-card-health-alert-content">
                    <span className="product-card-health-alert-message">{alert.message}</span>
                    <p className="product-card-health-alert-reason">{alert.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h3 className="product-card-list-title">{product.name}</h3>
          <p className="product-card-list-description">{product.description}</p>
          <p className="product-card-list-brand">by {product.brand}</p>

          <div className="product-card-list-rating">
            <div className="product-card-rating-stars">
              <Star className="product-card-star-icon" />
              <span className="product-card-rating-value">{product.rating}</span>
            </div>
            <span className="product-card-rating-separator">•</span>
            <span className="product-card-review-count">{product.reviews} reviews</span>
          </div>

          <div className="product-card-list-price-section">
            <div className="product-card-price-container">
              <span className="product-card-current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="product-card-original-price">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="product-card-list-actions">
              <button
                onClick={handleToggleWishlist}
                className={`product-card-wishlist-btn ${isInWishlist ? 'product-card-wishlist-active' : ''}`}
              >
                <Heart className={`product-card-heart-icon ${isInWishlist ? 'product-card-heart-filled' : ''}`} />
              </button>
              <button
                onClick={handleQuickView}
                className="product-card-quick-view-btn"
              >
                <Eye className="product-card-eye-icon" />
              </button>
            </div>
          </div>

          {product.stockCount < 10 && product.inStock && (
            <p className="product-card-low-stock">Only {product.stockCount} left!</p>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`product-card-add-to-cart-btn ${!product.inStock ? 'product-card-add-to-cart-disabled' : ''}`}
          >
            <ShoppingCart className="product-card-cart-icon" />
            <span className="product-card-cart-text">{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="product-card-container"
      onClick={onClick}
    >
      <div className="product-card-image-section">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card-image"
        />
        {discountPercentage > 0 && (
          <div className="product-card-discount-badge">
            {discountPercentage}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="product-card-out-of-stock-overlay">
            <span className="product-card-out-of-stock-text">Out of Stock</span>
          </div>
        )}
        <div className="product-card-action-buttons">
          <button
            onClick={handleToggleWishlist}
            className={`product-card-wishlist-btn ${isInWishlist ? 'product-card-wishlist-active' : ''}`}
          >
            <Heart className={`product-card-heart-icon ${isInWishlist ? 'product-card-heart-filled' : ''}`} />
          </button>
          <button
            onClick={handleQuickView}
            className="product-card-quick-view-btn"
          >
            <Eye className="product-card-eye-icon" />
          </button>
        </div>
      </div>

      <div className="product-card-content">
        {/* Health Alerts */}
        {state.showHealthAlerts && healthAlerts.length > 0 && (
          <div className="product-card-health-alerts">
            {healthAlerts.slice(0, 1).map((alert, index) => (
              <div key={index} className={`product-card-health-alert ${getAlertColor(alert)}`}>
                <span className="product-card-health-alert-icon">{getAlertIcon(alert)}</span>
                <div className="product-card-health-alert-content">
                  <span className="product-card-health-alert-message">{alert.message}</span>
                  <p className="product-card-health-alert-reason">{alert.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <p className="product-card-brand">by {product.brand}</p>

        <div className="product-card-rating">
          <div className="product-card-rating-stars">
            <Star className="product-card-star-icon" />
            <span className="product-card-rating-value">{product.rating}</span>
          </div>
          <span className="product-card-rating-separator">•</span>
          <span className="product-card-review-count">{product.reviews} reviews</span>
        </div>

        <div className="product-card-price-section">
          <div className="product-card-price-container">
            <span className="product-card-current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="product-card-original-price">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        {product.stockCount < 10 && product.inStock && (
          <p className="product-card-low-stock">Only {product.stockCount} left!</p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`product-card-add-to-cart-btn ${!product.inStock ? 'product-card-add-to-cart-disabled' : ''}`}
        >
          <ShoppingCart className="product-card-cart-icon" />
          <span className="product-card-cart-text">{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>

        <div className="product-card-tags">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="product-card-tag"
            >
              {tag.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};