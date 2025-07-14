import React from 'react';
import { ArrowRight, Star, Truck, Shield, Headphones, Zap, Award, Users } from 'lucide-react';
import { CategoryGrid } from './CategoryGrid';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import './HomePage.css';
import ImageUpload from './ImageUpload_qwer';
import ResultsGrid from './ResultsGrid_qwer';

export const HomePage = () => {
  const { state, dispatch } = useApp();

  const featuredProducts = products.slice(0, 8);
  const topRatedProducts = products.filter(p => p.rating >= 4.5).slice(0, 8);
  const dealsProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 8);

  const handleViewProduct = (productId) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: productId });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: `product-${productId}` });
  };

  const handleViewAllProducts = (category) => {
    if (category) {
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    }
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'products' });
  };

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <div className="homepage-hero-grid">
            <div className="homepage-hero-text">
              <h1 className="homepage-hero-title">
                Shop Smart.<br />
                <span className="homepage-hero-accent">Live Better.</span>
              </h1>
              <p className="homepage-hero-description">
                Discover millions of products with our AI-powered shopping assistant. 
                Get personalized health recommendations and smart alerts tailored to your lifestyle.
              </p>
              <div className="homepage-hero-actions">
                <button
                  onClick={() => handleViewAllProducts()}
                  className="homepage-hero-button-primary"
                >
                  Start Shopping
                  <ArrowRight className="homepage-hero-icon" />
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'ai-assistant' })}
                  className="homepage-hero-button-secondary"
                >
                  Try AI Assistant
                </button>
              </div>
            </div>
            <div className="homepage-hero-image">
              <img
                src="https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Shopping Experience"
                className="homepage-hero-img"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Features */}
      <section className="homepage-features">
        <div className="homepage-features-header">
          <h2 className="homepage-features-title">Why Choose ShopMart?</h2>
          <p className="homepage-features-subtitle">Experience the future of online shopping with our innovative features</p>
        </div>
        <div className="homepage-features-grid">
          <div className="homepage-features-card">
            <div className="homepage-features-icon homepage-features-icon-blue">
              <Truck className="homepage-features-icon-svg" />
            </div>
            <h3 className="homepage-features-card-title">Free Shipping</h3>
            <p className="homepage-features-card-text">Free delivery on orders over ₹500. Express delivery available.</p>
          </div>
          
          <div className="homepage-features-card">
            <div className="homepage-features-icon homepage-features-icon-green">
              <Shield className="homepage-features-icon-svg" />
            </div>
            <h3 className="homepage-features-card-title">Health Alerts</h3>
            <p className="homepage-features-card-text">Personalized warnings based on your dietary needs and allergies.</p>
          </div>
          
          <div className="homepage-features-card">
            <div className="homepage-features-icon homepage-features-icon-orange">
              <Zap className="homepage-features-icon-svg" />
            </div>
            <h3 className="homepage-features-card-title">AI Assistant</h3>
            <p className="homepage-features-card-text">Smart shopping help with AI recommendations and voice support.</p>
          </div>

          <div className="homepage-features-card">
            <div className="homepage-features-icon homepage-features-icon-purple">
              <Award className="homepage-features-icon-svg" />
            </div>
            <h3 className="homepage-features-card-title">Quality Assured</h3>
            <p className="homepage-features-card-text">Verified products from trusted brands with quality guarantee.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="homepage-categories">
        <div className="homepage-categories-header">
          <h2 className="homepage-categories-title">Shop by Category</h2>
          <p className="homepage-categories-subtitle">Explore our wide range of product categories</p>
        </div>
        <CategoryGrid />
      </section>

      {/* Today's Deals */}
      <section className="homepage-deals">
        <div className="homepage-deals-content">
          <div className="homepage-deals-header">
            <div>
              <h2 className="homepage-deals-title">Today's Deals</h2>
              <p className="homepage-deals-subtitle">Limited time offers - grab them before they're gone!</p>
            </div>
            <button
              onClick={() => handleViewAllProducts()}
              className="homepage-deals-view-all"
            >
              View All Deals
              <ArrowRight className="homepage-deals-arrow" />
            </button>
          </div>
          <div className="homepage-deals-grid">
            {dealsProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleViewProduct(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="homepage-featured">
        <div className="homepage-featured-header">
          <div>
            <h2 className="homepage-featured-title">Featured Products</h2>
            <p className="homepage-featured-subtitle">Handpicked products just for you</p>
          </div>
          <button
            onClick={() => handleViewAllProducts()}
            className="homepage-featured-view-all"
          >
            View All
            <ArrowRight className="homepage-featured-arrow" />
          </button>
        </div>
        <div className="homepage-featured-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleViewProduct(product.id)}
            />
          ))}
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="homepage-toprated">
        <div className="homepage-toprated-content">
          <div className="homepage-toprated-header">
            <Star className="homepage-toprated-star" />
            <div className="homepage-toprated-text">
              <h2 className="homepage-toprated-title">Top Rated Products</h2>
              <p className="homepage-toprated-subtitle">Customer favorites with excellent reviews</p>
            </div>
          </div>
          <div className="homepage-toprated-grid">
            {topRatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleViewProduct(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="homepage-stats">
        <div className="homepage-stats-content">
          <div className="homepage-stats-grid">
            <div className="homepage-stats-item">
              <div className="homepage-stats-number">10M+</div>
              <div className="homepage-stats-label">Products Available</div>
            </div>
            <div className="homepage-stats-item">
              <div className="homepage-stats-number">5M+</div>
              <div className="homepage-stats-label">Happy Customers</div>
            </div>
            <div className="homepage-stats-item">
              <div className="homepage-stats-number">50K+</div>
              <div className="homepage-stats-label">Brands</div>
            </div>
            <div className="homepage-stats-item">
              <div className="homepage-stats-number">99.9%</div>
              <div className="homepage-stats-label">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="homepage-newsletter">
        <div className="homepage-newsletter-content">
          <h2 className="homepage-newsletter-title">Stay Updated</h2>
          <p className="homepage-newsletter-description">
            Get the latest deals, health tips, and product recommendations delivered to your inbox
          </p>
          <div className="homepage-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="homepage-newsletter-input"
            />
            <button className="homepage-newsletter-button">
              Subscribe
            </button>
          </div>
          <p className="homepage-newsletter-disclaimer">
            Join 100,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};