import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, MessageCircle, Heart, Package, Grid3X3, List, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';
import './Header.css';
import AiImageModal from './AiImageModal';

export const Header = () => {
  const { state, dispatch } = useApp();
  const [showCategories, setShowCategories] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const handleNavClick = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    setShowCategories(false);
  };

  const handleCategoryClick = (categoryId) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryId });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' });
    setShowCategories(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (state.searchQuery.trim()) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' });
    }
  };

  const totalCartItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header-main">
      {/* Main Header */}
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo-section">
            <div 
              className="header-logo"
              onClick={() => handleNavClick('home')}
            >
              ShopMart
            </div>
          </div>

          {/* Search Bar */}
          <div className="header-search-wrapper">
            <form onSubmit={handleSearchSubmit} className="header-search-form">
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                className="header-search-input"
              />
              <Search className="header-search-icon" />
              <button
                type="button"
                className="header-search-lens-btn"
                title="AI Image Search"
                style={{ position: 'absolute', right: '5.5rem', top: '0.7rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => setShowAiModal(true)}
              >
                <Camera className="header-search-lens-icon" style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
              </button>
              <button
                type="submit"
                className="header-search-button"
              >
                Search
              </button>
            </form>
            <AiImageModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
          </div>

          {/* Navigation */}
          <div className="header-nav-section">
            <button
              onClick={() => handleNavClick('wishlist')}
              className="header-nav-button"
            >
              <Heart className="header-nav-icon" />
              {state.wishlist.length > 0 && (
                <span className="header-badge header-badge-red">
                  {state.wishlist.length}
                </span>
              )}
              <span className="header-nav-text">Wishlist</span>
            </button>
            
            <button
              onClick={() => handleNavClick('ai-assistant')}
              className="header-nav-button"
            >
              <MessageCircle className="header-nav-icon" />
              <span className="header-nav-text">AI Assistant</span>
            </button>

            <button
              onClick={() => handleNavClick('orders')}
              className="header-nav-button"
            >
              <Package className="header-nav-icon" />
              <span className="header-nav-text">Orders</span>
            </button>

            <button
              onClick={() => handleNavClick('cart')}
              className="header-nav-button"
            >
              <ShoppingCart className="header-nav-icon" />
              {totalCartItems > 0 && (
                <span className="header-badge header-badge-orange">
                  {totalCartItems}
                </span>
              )}
              <span className="header-nav-text">Cart</span>
            </button>

            <button
              onClick={() => state.user ? handleNavClick('profile') : dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
              className="header-nav-button"
            >
              <User className="header-nav-icon" />
              <span className="header-nav-text">
                {state.user ? state.user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="header-categories-bar">
        <div className="header-container">
          <div className="header-categories-content">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="header-categories-toggle"
            >
              <Menu className="header-categories-icon" />
              <span className="header-categories-text">All Categories</span>
            </button>
            
            <div className="header-categories-quick">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="header-categories-item"
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="header-special-links">
              <button
                onClick={() => handleNavClick('deals')}
                className="header-special-link header-deals-link"
              >
                Today's Deals
              </button>
              <button
                onClick={() => handleNavClick('new-arrivals')}
                className="header-special-link header-arrivals-link"
              >
                New Arrivals
              </button>
            </div>
          </div>
        </div>

        {/* Categories Dropdown */}
        {showCategories && (
          <div className="header-dropdown">
            <div className="header-container">
              <div className="header-dropdown-grid">
                {categories.map((category) => (
                  <div key={category.id} className="header-dropdown-section">
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="header-dropdown-category"
                    >
                      <span className="header-dropdown-icon">{category.icon}</span>
                      <span className="header-dropdown-name">{category.name}</span>
                    </button>
                    <div className="header-dropdown-subcategories">
                      {category.subcategories.slice(0, 4).map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category.id });
                            dispatch({ type: 'SET_SELECTED_SUBCATEGORY', payload: sub.id });
                            dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' });
                            setShowCategories(false);
                          }}
                          className="header-dropdown-subcategory"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};