import React, { useState } from 'react';
import { User as UserIcon, Edit2, Save, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './UserProfile.css';

export const UserProfile = () => {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    isDiabetic: state.user?.healthProfile.isDiabetic || false,
    isNutAllergic: state.user?.healthProfile.isNutAllergic || false,
    isLowSodium: state.user?.healthProfile.isLowSodium || false,
    isVegan: state.user?.healthProfile.isVegan || false,
    isGlutenFree: state.user?.healthProfile.isGlutenFree || false,
  });

  if (!state.user) {
    return (
      <div className="user-profile-container">
        <UserIcon className="user-profile-icon" />
        <h2 className="user-profile-title">Please sign in</h2>
        <p className="user-profile-text">You need to be signed in to view your profile</p>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
          className="user-profile-signin-btn"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedUser = {
      ...state.user,
      name: formData.name,
      email: formData.email,
      healthProfile: {
        isDiabetic: formData.isDiabetic,
        isNutAllergic: formData.isNutAllergic,
        isLowSodium: formData.isLowSodium,
        isVegan: formData.isVegan,
        isGlutenFree: formData.isGlutenFree,
        customAllergies: state.user.healthProfile.customAllergies
      }
    };

    dispatch({ type: 'SET_USER', payload: updatedUser });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'home' });
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <div className="user-profile-header">
          <div className="user-profile-header-content">
            <div className="user-profile-avatar-container">
              <UserIcon className="user-profile-avatar-icon" />
            </div>
            <div>
              <h1 className="user-profile-name">{state.user.name}</h1>
              <p className="user-profile-email">{state.user.email}</p>
            </div>
          </div>
          
          <div className="user-profile-header-buttons">
            {isEditing ? (
              <button
                onClick={() => setIsEditing(false)}
                className="user-profile-cancel-btn"
              >
                <X className="user-profile-icon-sm" />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="user-profile-edit-btn"
              >
                <Edit2 className="user-profile-icon-sm" />
              </button>
            )}
          </div>
        </div>

        <div className="user-profile-content">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="user-profile-form">
              <div className="user-profile-form-grid">
                <div>
                  <label className="user-profile-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="user-profile-input"
                  />
                </div>

                <div>
                  <label className="user-profile-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="user-profile-input"
                  />
                </div>
              </div>

              <div>
                <h3 className="user-profile-section-title">Health Profile</h3>
                <div className="user-profile-checkbox-grid">
                  <label className="user-profile-checkbox-label">
                    <input
                      type="checkbox"
                      name="isDiabetic"
                      checked={formData.isDiabetic}
                      onChange={handleChange}
                      className="user-profile-checkbox"
                    />
                    <span className="user-profile-checkbox-text">I have diabetes</span>
                  </label>

                  <label className="user-profile-checkbox-label">
                    <input
                      type="checkbox"
                      name="isNutAllergic"
                      checked={formData.isNutAllergic}
                      onChange={handleChange}
                      className="user-profile-checkbox"
                    />
                    <span className="user-profile-checkbox-text">I have nut allergies</span>
                  </label>

                  <label className="user-profile-checkbox-label">
                    <input
                      type="checkbox"
                      name="isLowSodium"
                      checked={formData.isLowSodium}
                      onChange={handleChange}
                      className="user-profile-checkbox"
                    />
                    <span className="user-profile-checkbox-text">I follow a low-sodium diet</span>
                  </label>

                  <label className="user-profile-checkbox-label">
                    <input
                      type="checkbox"
                      name="isVegan"
                      checked={formData.isVegan}
                      onChange={handleChange}
                      className="user-profile-checkbox"
                    />
                    <span className="user-profile-checkbox-text">I am vegan</span>
                  </label>

                  <label className="user-profile-checkbox-label">
                    <input
                      type="checkbox"
                      name="isGlutenFree"
                      checked={formData.isGlutenFree}
                      onChange={handleChange}
                      className="user-profile-checkbox"
                    />
                    <span className="user-profile-checkbox-text">I follow a gluten-free diet</span>
                  </label>
                </div>
              </div>

              <div className="user-profile-form-buttons">
                <button
                  type="submit"
                  className="user-profile-submit-btn"
                >
                  <Save className="user-profile-icon-xs" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="user-profile-cancel-form-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="user-profile-info">
              <div>
                <h3 className="user-profile-section-title">Account Information</h3>
                <div className="user-profile-info-grid">
                  <div>
                    <span className="user-profile-info-label">Name:</span>
                    <p className="user-profile-info-text">{state.user.name}</p>
                  </div>
                  <div>
                    <span className="user-profile-info-label">Email:</span>
                    <p className="user-profile-info-text">{state.user.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="user-profile-section-title">Health Profile</h3>
                <div className="user-profile-health-grid">
                  <div className={state.user.healthProfile.isDiabetic ? 'user-profile-health-item-diabetic' : 'user-profile-health-item'}>
                    Diabetic: {state.user.healthProfile.isDiabetic ? 'Yes' : 'No'}
                  </div>
                  <div className={state.user.healthProfile.isNutAllergic ? 'user-profile-health-item-nut-allergic' : 'user-profile-health-item'}>
                    Nut Allergies: {state.user.healthProfile.isNutAllergic ? 'Yes' : 'No'}
                  </div>
                  <div className={state.user.healthProfile.isLowSodium ? 'user-profile-health-item-low-sodium' : 'user-profile-health-item'}>
                    Low Sodium Diet: {state.user.healthProfile.isLowSodium ? 'Yes' : 'No'}
                  </div>
                  <div className={state.user.healthProfile.isVegan ? 'user-profile-health-item-vegan' : 'user-profile-health-item'}>
                    Vegan: {state.user.healthProfile.isVegan ? 'Yes' : 'No'}
                  </div>
                  <div className={state.user.healthProfile.isGlutenFree ? 'user-profile-health-item-gluten-free' : 'user-profile-health-item'}>
                    Gluten-Free: {state.user.healthProfile.isGlutenFree ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              <div className="user-profile-actions">
                <button
                  onClick={handleLogout}
                  className="user-profile-logout-btn"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};