import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './LoginModal.css';

export const LoginModal = () => {
  const { state, dispatch } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    isDiabetic: false,
    isNutAllergic: false,
    isGlutenIntolerant: false,
    isLowSodium: false,
    isVegan: false,
    isVegetarian: false,
    isKeto: false,
    customAllergies: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulate login
      const user = {
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0],
        phone: '+91 9876543210',
        addresses: [],
        healthProfile: {
          isDiabetic: false,
          isNutAllergic: false,
          isGlutenIntolerant: false,
          isLowSodium: false,
          isVegan: false,
          isVegetarian: false,
          isKeto: false,
          customAllergies: [],
          dietaryRestrictions: []
        },
        preferences: [],
        wishlist: [],
        recentlyViewed: [],
        purchaseHistory: []
      };
      dispatch({ type: 'SET_USER', payload: user });
    } else {
      // Simulate signup
      const user = {
        id: '1',
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        addresses: [],
        healthProfile: {
          isDiabetic: formData.isDiabetic,
          isNutAllergic: formData.isNutAllergic,
          isGlutenIntolerant: formData.isGlutenIntolerant,
          isLowSodium: formData.isLowSodium,
          isVegan: formData.isVegan,
          isVegetarian: formData.isVegetarian,
          isKeto: formData.isKeto,
          customAllergies: formData.customAllergies,
          dietaryRestrictions: []
        },
        preferences: [],
        wishlist: [],
        recentlyViewed: [],
        purchaseHistory: []
      };
      dispatch({ type: 'SET_USER', payload: user });
    }
    
    dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!state.isLoginModalOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-container">
        {/* Header */}
        <div className="login-modal-header">
          <h2 className="login-modal-title">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
            className="login-modal-close-btn"
          >
            <X className="login-modal-close-icon" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-modal-form">
          {!isLogin && (
            <>
              <div className="login-modal-field">
                <label className="login-modal-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="login-modal-input"
                />
              </div>

              <div className="login-modal-field">
                <label className="login-modal-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="login-modal-input"
                />
              </div>
            </>
          )}

          <div className="login-modal-field">
            <label className="login-modal-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="login-modal-input"
            />
          </div>

          <div className="login-modal-field">
            <label className="login-modal-label">
              Password
            </label>
            <div className="login-modal-password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="login-modal-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-modal-password-toggle"
              >
                {showPassword ? <EyeOff className="login-modal-eye-icon" /> : <Eye className="login-modal-eye-icon" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="login-modal-health-section">
              <h3 className="login-modal-health-title">Health Profile (Optional)</h3>
              <p className="login-modal-health-description">
                Help us provide personalized recommendations and health alerts
              </p>
              
              <div className="login-modal-health-options">
                <label className="login-modal-checkbox-label">
                  <input
                    type="checkbox"
                    name="isDiabetic"
                    checked={formData.isDiabetic}
                    onChange={handleChange}
                    className="login-modal-checkbox"
                  />
                  <span className="login-modal-checkbox-text">I have diabetes</span>
                </label>

                <label className="login-modal-checkbox-label">
                  <input
                    type="checkbox"
                    name="isNutAllergic"
                    checked={formData.isNutAllergic}
                    onChange={handleChange}
                    className="login-modal-checkbox"
                  />
                  <span className="login-modal-checkbox-text">I have nut allergies</span>
                </label>

                <label className="login-modal-checkbox-label">
                  <input
                    type="checkbox"
                    name="isGlutenIntolerant"
                    checked={formData.isGlutenIntolerant}
                    onChange={handleChange}
                    className="login-modal-checkbox"
                  />
                  <span className="login-modal-checkbox-text">I have gluten intolerance</span>
                </label>

                <label className="login-modal-checkbox-label">
                  <input
                    type="checkbox"
                    name="isLowSodium"
                    checked={formData.isLowSodium}
                    onChange={handleChange}
                    className="login-modal-checkbox"
                  />
                  <span className="login-modal-checkbox-text">I follow a low-sodium diet</span>
                </label>

                <label className="login-modal-checkbox-label">
                  <input
                    type="checkbox"
                    name="isVegan"
                    checked={formData.isVegan}
                    onChange={handleChange}
                    className="login-modal-checkbox"
                  />
                  <span className="login-modal-checkbox-text">I am vegan</span>
                </label>

                <label className="login-modal-checkbox-label">
                  <input
                    type="checkbox"
                    name="isVegetarian"
                    checked={formData.isVegetarian}
                    onChange={handleChange}
                    className="login-modal-checkbox"
                  />
                  <span className="login-modal-checkbox-text">I am vegetarian</span>
                </label>

                <label className="login-modal-checkbox-label">
                  <input
                    type="checkbox"
                    name="isKeto"
                    checked={formData.isKeto}
                    onChange={handleChange}
                    className="login-modal-checkbox"
                  />
                  <span className="login-modal-checkbox-text">I follow a ketogenic diet</span>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="login-modal-submit-btn"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="login-modal-toggle-container">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="login-modal-toggle-btn"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};