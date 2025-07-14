import { products } from '../data/products';
import { categories } from '../data/categories';

export const generateHealthAlerts = (product, user) => {
  if (!user || !user.healthProfile) return [];

  const alerts = [];
  const { healthProfile } = user;

  // Check for diabetic warnings
  if (healthProfile.isDiabetic) {
    if (product.healthTags.includes('high-sugar')) {
      alerts.push({
        type: 'danger',
        message: 'This product contains high sugar content',
        reason: 'Not recommended for diabetic users',
        severity: 'high'
      });
    }
    if (product.healthTags.includes('high-carbs')) {
      alerts.push({
        type: 'warning',
        message: 'This product is high in carbohydrates',
        reason: 'May affect blood sugar levels',
        severity: 'medium'
      });
    }
  }

  // Check for nut allergies
  if (healthProfile.isNutAllergic) {
    if (product.healthTags.includes('contains-nuts')) {
      alerts.push({
        type: 'danger',
        message: 'This product contains nuts',
        reason: 'May cause severe allergic reactions',
        severity: 'high'
      });
    }
    if (product.healthTags.includes('contains-peanuts')) {
      alerts.push({
        type: 'danger',
        message: 'This product contains peanuts',
        reason: 'May cause severe allergic reactions',
        severity: 'high'
      });
    }
  }

  // Check for gluten intolerance
  if (healthProfile.isGlutenIntolerant) {
    if (product.healthTags.includes('contains-gluten')) {
      alerts.push({
        type: 'warning',
        message: 'This product contains gluten',
        reason: 'Not suitable for gluten-free diet',
        severity: 'medium'
      });
    }
  }

  // Check for low sodium diet
  if (healthProfile.isLowSodium) {
    if (product.healthTags.includes('high-sodium')) {
      alerts.push({
        type: 'warning',
        message: 'This product is high in sodium',
        reason: 'Not suitable for low-sodium diet',
        severity: 'medium'
      });
    }
    if (product.nutritionInfo && parseInt(product.nutritionInfo.sodium.replace('mg', '')) > 200) {
      alerts.push({
        type: 'warning',
        message: `High sodium content: ${product.nutritionInfo.sodium}`,
        reason: 'Exceeds recommended daily intake for low-sodium diet',
        severity: 'medium'
      });
    }
  }

  // Check for vegan diet
  if (healthProfile.isVegan) {
    if (product.healthTags.includes('contains-dairy')) {
      alerts.push({
        type: 'info',
        message: 'This product contains dairy',
        reason: 'Not suitable for vegan diet',
        severity: 'low'
      });
    }
    if (product.healthTags.includes('contains-eggs')) {
      alerts.push({
        type: 'info',
        message: 'This product contains eggs',
        reason: 'Not suitable for vegan diet',
        severity: 'low'
      });
    }
    if (product.healthTags.includes('contains-meat')) {
      alerts.push({
        type: 'info',
        message: 'This product contains meat',
        reason: 'Not suitable for vegan diet',
        severity: 'low'
      });
    }
  }

  // Check for vegetarian diet
  if (healthProfile.isVegetarian && !healthProfile.isVegan) {
    if (product.healthTags.includes('contains-meat')) {
      alerts.push({
        type: 'info',
        message: 'This product contains meat',
        reason: 'Not suitable for vegetarian diet',
        severity: 'low'
      });
    }
  }

  // Check for keto diet
  if (healthProfile.isKeto) {
    if (product.healthTags.includes('high-carbs')) {
      alerts.push({
        type: 'warning',
        message: 'This product is high in carbohydrates',
        reason: 'Not suitable for ketogenic diet',
        severity: 'medium'
      });
    }
    if (product.nutritionInfo && parseInt(product.nutritionInfo.carbs.replace('g', '')) > 5) {
      alerts.push({
        type: 'warning',
        message: `High carb content: ${product.nutritionInfo.carbs}`,
        reason: 'May break ketosis',
        severity: 'medium'
      });
    }
  }

  // Check for custom allergies
  healthProfile.customAllergies.forEach(allergy => {
    if (product.ingredients?.some(ingredient => 
      ingredient.toLowerCase().includes(allergy.toLowerCase())
    )) {
      alerts.push({
        type: 'danger',
        message: `This product may contain ${allergy}`,
        reason: 'Listed in your custom allergies',
        severity: 'high'
      });
    }
  });

  return alerts;
};

export const getAlertColor = (alert) => {
  switch (alert.type) {
    case 'danger':
      return 'health-alert-danger';
    case 'warning':
      return 'health-alert-warning';
    case 'info':
      return 'health-alert-info';
    default:
      return 'health-alert-default';
  }
};

export const getAlertIcon = (alert) => {
  switch (alert.type) {
    case 'danger':
      return '🚨';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    default:
      return '📋';
  }
};