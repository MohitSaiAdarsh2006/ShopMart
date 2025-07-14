import React, { useState } from 'react';
import { Filter, X, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { categories } from '../data/categories';
import './ProductFilters.css';

export const ProductFilters = () => {
  const { state, dispatch } = useApp();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const brands = [...new Set(products.map(p => p.brand))];
  const healthTags = ['sugar-free', 'diabetic-friendly', 'low-sodium', 'organic', 'gluten-free', 'vegan', 'keto-friendly', 'high-protein'];
  
  const currentCategory = categories.find(c => c.id === state.selectedCategory);
  const subcategories = currentCategory?.subcategories || [];

  const handleBrandToggle = (brand) => {
    const newBrands = state.selectedBrands.includes(brand)
      ? state.selectedBrands.filter(b => b !== brand)
      : [...state.selectedBrands, brand];
    dispatch({ type: 'SET_SELECTED_BRANDS', payload: newBrands });
  };

  const handleHealthFilterToggle = (filter) => {
    const newFilters = state.healthFilters.includes(filter)
      ? state.healthFilters.filter(f => f !== filter)
      : [...state.healthFilters, filter];
    dispatch({ type: 'SET_HEALTH_FILTERS', payload: newFilters });
  };

  const handleSubcategoryChange = (subcategoryId) => {
    dispatch({ type: 'SET_SELECTED_SUBCATEGORY', payload: subcategoryId });
  };

  const clearAllFilters = () => {
    dispatch({ type: 'SET_SELECTED_BRANDS', payload: [] });
    dispatch({ type: 'SET_HEALTH_FILTERS', payload: [] });
    dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 200000] });
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: '' });
    dispatch({ type: 'SET_SELECTED_SUBCATEGORY', payload: '' });
  };

  const activeFiltersCount = state.selectedBrands.length + state.healthFilters.length + 
    (state.selectedCategory ? 1 : 0) + (state.selectedSubcategory ? 1 : 0);

  return (
    <div className="product-filters-container">
      <div className="product-filters-header">
        <div className="product-filters-header-left">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="product-filters-toggle-btn"
          >
            <SlidersHorizontal className="product-filters-icon-sm" />
            <span className="product-filters-toggle-text">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="product-filters-count">
                {activeFiltersCount}
              </span>
            )}
          </button>
          
          <div className="product-filters-sort-container">
            <span className="product-filters-sort-label">Sort by:</span>
            <select
              value={state.sortBy}
              onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value })}
              className="product-filters-sort-select"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
        
        <div className="product-filters-header-right">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_HEALTH_ALERTS' })}
            className={state.showHealthAlerts 
              ? 'product-filters-health-alerts-on'
              : 'product-filters-health-alerts-off'}
          >
            Health Alerts: {state.showHealthAlerts ? 'ON' : 'OFF'}
          </button>
          
          <div className="product-filters-view-toggle">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' })}
              className={state.viewMode === 'grid' ? 'product-filters-view-btn-active' : 'product-filters-view-btn'}
            >
              <Grid3X3 className="product-filters-icon-xs" />
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'list' })}
              className={state.viewMode === 'list' ? 'product-filters-view-btn-active' : 'product-filters-view-btn'}
            >
              <List className="product-filters-icon-xs" />
            </button>
          </div>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="product-filters-clear-btn"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className="product-filters-active">
          {state.selectedCategory && (
            <span className="product-filters-active-tag">
              {categories.find(c => c.id === state.selectedCategory)?.name}
              <button
                onClick={() => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: '' })}
                className="product-filters-remove-tag-btn"
              >
                <X className="product-filters-icon-tiny" />
              </button>
            </span>
          )}
          {state.selectedSubcategory && (
            <span className="product-filters-active-tag">
              {subcategories.find(s => s.id === state.selectedSubcategory)?.name}
              <button
                onClick={() => dispatch({ type: 'SET_SELECTED_SUBCATEGORY', payload: '' })}
                className="product-filters-remove-tag-btn"
              >
                <X className="product-filters-icon-tiny" />
              </button>
            </span>
          )}
          {state.selectedBrands.map(brand => (
            <span key={brand} className="product-filters-active-brand-tag">
              {brand}
              <button
                onClick={() => handleBrandToggle(brand)}
                className="product-filters-remove-brand-tag-btn"
              >
                <X className="product-filters-icon-tiny" />
              </button>
            </span>
          ))}
          {state.healthFilters.map(filter => (
            <span key={filter} className="product-filters-active-health-tag">
              {filter.replace('-', ' ')}
              <button
                onClick={() => handleHealthFilterToggle(filter)}
                className="product-filters-remove-health-tag-btn"
              >
                <X className="product-filters-icon-tiny" />
              </button>
            </span>
          ))}
        </div>
      )}

      {isFiltersOpen && (
        <div className="product-filters-details">
          {subcategories.length > 0 && (
            <div className="product-filters-section">
              <h3 className="product-filters-section-title">Subcategories</h3>
              <div className="product-filters-options">
                {subcategories.map((subcategory) => (
                  <label key={subcategory.id} className="product-filters-option-label">
                    <input
                      type="radio"
                      name="subcategory"
                      checked={state.selectedSubcategory === subcategory.id}
                      onChange={() => handleSubcategoryChange(subcategory.id)}
                      className="product-filters-radio"
                    />
                    <span className="product-filters-option-text">{subcategory.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="product-filters-section">
            <h3 className="product-filters-section-title">Price Range</h3>
            <div className="product-filters-price-range">
              <input
                type="number"
                placeholder="Min"
                value={state.priceRange[0]}
                onChange={(e) => dispatch({ 
                  type: 'SET_PRICE_RANGE', 
                  payload: [parseInt(e.target.value) || 0, state.priceRange[1]] 
                })}
                className="product-filters-price-input"
              />
              <span className="product-filters-price-separator">-</span>
              <input
                type="number"
                placeholder="Max"
                value={state.priceRange[1]}
                onChange={(e) => dispatch({ 
                  type: 'SET_PRICE_RANGE', 
                  payload: [state.priceRange[0], parseInt(e.target.value) || 200000] 
                })}
                className="product-filters-price-input"
              />
            </div>
          </div>

          <div className="product-filters-section">
            <h3 className="product-filters-section-title">Brands</h3>
            <div className="product-filters-brands">
              {brands.map((brand) => (
                <label key={brand} className="product-filters-option-label">
                  <input
                    type="checkbox"
                    checked={state.selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="product-filters-checkbox"
                  />
                  <span className="product-filters-option-text">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="product-filters-section">
            <h3 className="product-filters-section-title">Health & Dietary</h3>
            <div className="product-filters-options">
              {healthTags.map((tag) => (
                <label key={tag} className="product-filters-option-label">
                  <input
                    type="checkbox"
                    checked={state.healthFilters.includes(tag)}
                    onChange={() => handleHealthFilterToggle(tag)}
                    className="product-filters-checkbox"
                  />
                  <span className="product-filters-option-text">{tag.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};