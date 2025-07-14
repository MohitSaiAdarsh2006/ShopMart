import React from 'react';
import { categories } from '../data/categories';
import { useApp } from '../context/AppContext';
import './CategoryGrid.css';

export const CategoryGrid = () => {
  const { dispatch } = useApp();
  
  const handleCategoryClick = (categoryId) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryId });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' });
  };
  
  return (
    <div className="category-grid-container">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="category-grid-item"
        >
          <div className="category-grid-image-wrapper">
            <img
              src={category.image || `https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=400`}
              alt={category.name}
              className="category-grid-image"
            />
            <div className="category-grid-overlay"></div>
            <div className="category-grid-icon-wrapper">
              <div className="category-grid-icon">{category.icon}</div>
            </div>
          </div>
          <div className="category-grid-content">
            <h3 className="category-grid-title">
              {category.name}
            </h3>
            <p className="category-grid-subtitle">
              {category.subcategories.length} categories
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};