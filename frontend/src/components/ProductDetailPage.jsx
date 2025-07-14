import React from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import './ProductDetailPage.css';

export const ProductDetailPage = ({ productId }) => {
  const { state, dispatch } = useApp();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="product-detail-not-found-container">
        <h2 className="product-detail-not-found-title">Product not found</h2>
        <button
          onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' })}
          className="product-detail-back-link"
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const getHealthWarnings = () => {
    if (!state.user) return [];

    const warnings = [];
    const { healthProfile } = state.user;

    if (healthProfile.isDiabetic && product.tags.includes('high-sugar')) {
      warnings.push('Contains high sugar - Not recommended for diabetic users');
    }

    if (healthProfile.isNutAllergic && product.tags.includes('contains-nuts')) {
      warnings.push('Contains nuts - May cause allergic reactions');
    }

    if (healthProfile.isNutAllergic && product.tags.includes('contains-peanuts')) {
      warnings.push('Contains peanuts - May cause allergic reactions');
    }

    if (healthProfile.isLowSodium && product.nutritionInfo && parseInt(product.nutritionInfo.sodium) > 200) {
      warnings.push('High sodium content - Not suitable for low-sodium diet');
    }

    return warnings;
  };

  const healthWarnings = getHealthWarnings();

  return (
    <div className="product-detail-main-container">
      {/* Back Button */}
      <button
        onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' })}
        className="product-detail-back-button"
      >
        <ArrowLeft className="product-detail-back-icon" />
        Back to Products
      </button>

      <div className="product-detail-content-grid">
        {/* Product Image */}
        <div className="product-detail-image-section">
          <div className="product-detail-image-container">
            <img
              src={product.images}
              alt={product.name}
              className="product-detail-image"
            />
            {product.originalPrice && (
              <div className="product-detail-discount-badge">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}
            {!product.inStock && (
              <div className="product-detail-out-of-stock-overlay">
                <span className="product-detail-out-of-stock-text">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="product-detail-info-section">
          {/* Health Warnings */}
          {healthWarnings.length > 0 && (
            <div className="product-detail-warnings-container">
              {healthWarnings.map((warning, index) => (
                <div key={index} className="product-detail-warning-item">
                  <AlertTriangle className="product-detail-warning-icon" />
                  <span className="product-detail-warning-text">{warning}</span>
                </div>
              ))}
            </div>
          )}

          <div className="product-detail-main-info">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-rating-container">
              <div className="product-detail-rating-stars">
                <div className="product-detail-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`product-detail-star ${
                        i < Math.floor(product.rating)
                          ? 'product-detail-star-filled'
                          : 'product-detail-star-empty'
                      }`}
                    />
                  ))}
                </div>
                <span className="product-detail-rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="product-detail-price-container">
              <span className="product-detail-current-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="product-detail-original-price">₹{product.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="product-detail-actions">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`product-detail-add-to-cart ${!product.inStock ? 'product-detail-add-to-cart-disabled' : ''}`}
            >
              <ShoppingCart className="product-detail-cart-icon" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button className="product-detail-action-button">
              <Heart className="product-detail-action-icon" />
            </button>

            <button className="product-detail-action-button">
              <Share2 className="product-detail-action-icon" />
            </button>
          </div>

          {/* Product Info */}
          <div className="product-detail-additional-info">
            <div className="product-detail-info-block">
              <h3 className="product-detail-info-title">Product Information</h3>
              <div className="product-detail-info-grid">
                <div className="product-detail-info-item">
                  <span className="product-detail-info-label">Brand:</span>
                  <span className="product-detail-info-value">{product.brand}</span>
                </div>
                <div className="product-detail-info-item">
                  <span className="product-detail-info-label">Category:</span>
                  <span className="product-detail-info-value product-detail-capitalize">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Nutrition Info */}
            {product.nutritionInfo && (
              <div className="product-detail-info-block">
                <h3 className="product-detail-info-title">Nutrition Information</h3>
                <div className="product-detail-nutrition-container">
                  <div className="product-detail-nutrition-grid">
                    <div className="product-detail-nutrition-item">
                      <span className="product-detail-nutrition-label">Calories:</span>
                      <span className="product-detail-nutrition-value">{product.nutritionInfo.calories}</span>
                    </div>
                    <div className="product-detail-nutrition-item">
                      <span className="product-detail-nutrition-label">Protein:</span>
                      <span className="product-detail-nutrition-value">{product.nutritionInfo.protein}</span>
                    </div>
                    <div className="product-detail-nutrition-item">
                      <span className="product-detail-nutrition-label">Carbs:</span>
                      <span className="product-detail-nutrition-value">{product.nutritionInfo.carbs}</span>
                    </div>
                    <div className="product-detail-nutrition-item">
                      <span className="product-detail-nutrition-label">Fat:</span>
                      <span className="product-detail-nutrition-value">{product.nutritionInfo.fat}</span>
                    </div>
                    <div className="product-detail-nutrition-item">
                      <span className="product-detail-nutrition-label">Fiber:</span>
                      <span className="product-detail-nutrition-value">{product.nutritionInfo.fiber}</span>
                    </div>
                    <div className="product-detail-nutrition-item">
                      <span className="product-detail-nutrition-label">Sodium:</span>
                      <span className="product-detail-nutrition-value">{product.nutritionInfo.sodium}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="product-detail-info-block">
                <h3 className="product-detail-info-title">Ingredients</h3>
                <p className="product-detail-ingredients-text">
                  {product.ingredients.join(', ')}
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="product-detail-info-block">
              <h3 className="product-detail-info-title">Product Tags</h3>
              <div className="product-detail-tags-container">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="product-detail-tag"
                  >
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};