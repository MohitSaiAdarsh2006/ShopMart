import { createContext, useContext, useReducer } from 'react';

const initialState = {
  user: null,
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  isLoginModalOpen: false,
  currentPage: 'home',
  searchQuery: '',
  selectedCategory: '',
  selectedSubcategory: '',
  priceRange: [0, 200000],
  selectedBrands: [],
  healthFilters: [],
  sortBy: 'relevance',
  viewMode: 'grid',
  showHealthAlerts: true
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, { product: action.payload, quantity: 1 }] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload) };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_WISHLIST':
      return { 
        ...state, 
        wishlist: state.wishlist.includes(action.payload) 
          ? state.wishlist 
          : [...state.wishlist, action.payload] 
      };
    case 'REMOVE_FROM_WISHLIST':
      return { 
        ...state, 
        wishlist: state.wishlist.filter(id => id !== action.payload) 
      };
    case 'ADD_TO_RECENTLY_VIEWED':
      const filtered = state.recentlyViewed.filter(id => id !== action.payload);
      return { 
        ...state, 
        recentlyViewed: [action.payload, ...filtered].slice(0, 10) 
      };
    case 'TOGGLE_LOGIN_MODAL':
      return { ...state, isLoginModalOpen: !state.isLoginModalOpen };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload, selectedSubcategory: '' };
    case 'SET_SELECTED_SUBCATEGORY':
      return { ...state, selectedSubcategory: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_SELECTED_BRANDS':
      return { ...state, selectedBrands: action.payload };
    case 'SET_HEALTH_FILTERS':
      return { ...state, healthFilters: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'TOGGLE_HEALTH_ALERTS':
      return { ...state, showHealthAlerts: !state.showHealthAlerts };
    default:
      return state;
  }
};

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};