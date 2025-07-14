import React, { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { categories } from '../data/categories';
import './ProductsPage.css';

export const ProductsPage = () => {
  const { state, dispatch } = useApp();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query)) ||
          product.healthTags.some(tag => tag.toLowerCase().includes(query)) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (state.selectedCategory) {
      filtered = filtered.filter((product) => product.category === state.selectedCategory);
    }

    // Subcategory filter
    if (state.selectedSubcategory) {
      filtered = filtered.filter((product) => product.subcategory === state.selectedSubcategory);
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= state.priceRange[0] && product.price <= state.priceRange[1]
    );

    // Brand filter
    if (state.selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        state.selectedBrands.includes(product.brand)
      );
    }

    // Health filters
    if (state.healthFilters.length > 0) {
      filtered = filtered.filter((product) =>
        state.healthFilters.some((filter) => 
          product.tags.includes(filter) || product.healthTags.includes(filter)
        )
      );
    }

    // Sorting
    switch (state.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    state.searchQuery,
    state.selectedCategory,
    state.selectedSubcategory,
    state.priceRange,
    state.selectedBrands,
    state.healthFilters,
    state.sortBy,
  ]);

  const handleViewProduct = (productId) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: productId });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: `product-${productId}` });
  };

  const currentCategory = categories.find(c => c.id === state.selectedCategory);
  const currentSubcategory = currentCategory?.subcategories.find(s => s.id === state.selectedSubcategory);

  const getPageTitle = () => {
    if (state.searchQuery) {
      return `Search results for "${state.searchQuery}"`;
    }
    if (currentSubcategory) {
      return currentSubcategory.name;
    }
    if (currentCategory) {
      return currentCategory.name;
    }
    return 'All Products';
  };

  return (
    <div className="products-page-container">
      <div className="products-page-header">
        <h1 className="products-page-title">{getPageTitle()}</h1>
        <p className="products-page-subtitle">
          {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
          {state.searchQuery && ` for "${state.searchQuery}"`}
        </p>
      </div>

      <div className="products-page-layout">
        <div className="products-page-sidebar">
          <ProductFilters />
        </div>

        <div className="products-page-content">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="products-page-empty">
              <div className="products-page-empty-icon">🔍</div>
              <h3 className="products-page-empty-title">No products found</h3>
              <p className="products-page-empty-text">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                  dispatch({ type: 'SET_SELECTED_CATEGORY', payload: '' });
                  dispatch({ type: 'SET_SELECTED_SUBCATEGORY', payload: '' });
                  dispatch({ type: 'SET_SELECTED_BRANDS', payload: [] });
                  dispatch({ type: 'SET_HEALTH_FILTERS', payload: [] });
                  dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 200000] });
                }}
                className="products-page-clear-btn"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={state.viewMode === 'grid' ? 'products-page-grid' : 'products-page-list'}>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={state.viewMode}
                  onClick={() => handleViewProduct(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};