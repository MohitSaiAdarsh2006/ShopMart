import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { Cart } from './components/Cart';
import { AIAssistant } from './components/AIAssistant';
import { UserProfile } from './components/UserProfile';
import { Wishlist } from './components/Wishlist';
import { LoginModal } from './components/LoginModal';
import { useApp } from './context/AppContext';
import './App.css';

const AppContent = () => {
  const { state } = useApp();

  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'cart':
        return <Cart />;
      case 'wishlist':
        return <Wishlist />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'profile':
        return <UserProfile />;
      case 'orders':
        return (
          <div className="app-orders-container">
            <h2 className="app-orders-title">Order History</h2>
            <p className="app-orders-text">Your order history will appear here</p>
          </div>
        );
      case 'deals':
        return (
          <div className="app-deals-container">
            <h2 className="app-deals-title">Today's Deals</h2>
            <p className="app-deals-text">Special deals and offers will be displayed here</p>
          </div>
        );
      case 'new-arrivals':
        return (
          <div className="app-new-arrivals-container">
            <h2 className="app-new-arrivals-title">New Arrivals</h2>
            <p className="app-new-arrivals-text">Latest products will be shown here</p>
          </div>
        );
      default:
        if (state.currentPage.startsWith('product-')) {
          const productId = state.currentPage.replace('product-', '');
          return <ProductDetailPage productId={productId} />;
        }
        return <HomePage />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        {renderCurrentPage()}
      </main>
      <LoginModal />
      
      <footer className="app-footer">
        <div className="app-footer-content">
          <div className="app-footer-grid">
            <div className="app-footer-section">
              <h3 className="app-footer-title">ShopMart</h3>
              <p className="app-footer-description">
                Your intelligent shopping companion with AI-powered recommendations and health alerts.
              </p>
            </div>
            <div className="app-footer-section">
              <h4 className="app-footer-subtitle">Customer Service</h4>
              <ul className="app-footer-list">
                <li>Help Center</li>
                <li>Returns & Exchanges</li>
                <li>Shipping Info</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="app-footer-section">
              <h4 className="app-footer-subtitle">About</h4>
              <ul className="app-footer-list">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Sustainability</li>
              </ul>
            </div>
            <div className="app-footer-section">
              <h4 className="app-footer-subtitle">Connect</h4>
              <ul className="app-footer-list">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
          <div className="app-footer-bottom">
            <p>© 2025 ShopMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;