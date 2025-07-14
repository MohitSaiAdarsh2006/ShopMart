/**
 * @typedef {Object} Product
 * @property {string} id - Unique identifier for the product
 * @property {string} name - Name of the product
 * @property {string} description - Description of the product
 * @property {number} price - Current price of the product
 * @property {number} [originalPrice] - Original price of the product (optional)
 * @property {string[]} images - Array of image URLs for the product
 * @property {string} category - Category ID of the product
 * @property {string} subcategory - Subcategory ID of the product
 * @property {string} brand - Brand of the product
 * @property {number} rating - Average rating of the product (0-5)
 * @property {number} reviews - Number of reviews for the product
 * @property {boolean} inStock - Whether the product is in stock
 * @property {number} stockCount - Number of items in stock
 * @property {{calories: number, protein: string, carbs: string, fat: string, fiber: string, sodium: string}} [nutritionInfo] - Nutritional information (optional)
 * @property {string[]} [ingredients] - List of ingredients (optional)
 * @property {string[]} tags - Tags describing the product
 * @property {string[]} healthTags - Health-related tags for the product
 * @property {{[key: string]: string}} [specifications] - Product specifications (optional)
 * @property {string[]} [features] - Product features (optional)
 * @property {string} [warranty] - Warranty information (optional)
 * @property {string} [returnPolicy] - Return policy information (optional)
 * @property {string} [shippingInfo] - Shipping information (optional)
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user
 * @property {string} email - User's email address
 * @property {string} name - User's name
 * @property {string} [phone] - User's phone number (optional)
 * @property {Address[]} addresses - Array of user addresses
 * @property {{isDiabetic: boolean, isNutAllergic: boolean, isギルテンIntolerant: boolean, isLowSodium: boolean, isVegan: boolean, isVegetarian: boolean, isKeto: boolean, customAllergies: string[], dietaryRestrictions: string[]}} healthProfile - User's health profile
 * @property {string[]} preferences - User's preferences
 * @property {string[]} wishlist - Array of product IDs in the user's wishlist
 * @property {string[]} recentlyViewed - Array of recently viewed product IDs
 * @property {Order[]} purchaseHistory - Array of user's past orders
 */

/**
 * @typedef {Object} Address
 * @property {string} id - Unique identifier for the address
 * @property {'home' | 'work' | 'other'} type - Type of address
 * @property {string} name - Name associated with the address
 * @property {string} street - Street address
 * @property {string} city - City
 * @property {string} state - State or region
 * @property {string} zipCode - ZIP or postal code
 * @property {string} country - Country
 * @property {boolean} isDefault - Whether this is the default address
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product - The product in the cart
 * @property {number} quantity - Quantity of the product
 * @property {string} [selectedVariant] - Selected product variant (optional)
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Unique identifier for the order
 * @property {string} userId - ID of the user who placed the order
 * @property {CartItem[]} items - Array of items in the order
 * @property {number} subtotal - Subtotal of the order
 * @property {number} shipping - Shipping cost
 * @property {number} tax - Tax amount
 * @property {number} total - Total order amount
 * @property {'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'} status - Order status
 * @property {string} paymentMethod - Payment method used
 * @property {Address} shippingAddress - Shipping address
 * @property {Address} billingAddress - Billing address
 * @property {Date} orderDate - Date the order was placed
 * @property {Date} estimatedDelivery - Estimated delivery date
 * @property {string} [trackingNumber] - Tracking number for the order (optional)
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Unique identifier for the category
 * @property {string} name - Name of the category
 * @property {string} icon - Icon representing the category
 * @property {Subcategory[]} subcategories - Array of subcategories
 * @property {string} [image] - Image URL for the category (optional)
 */

/**
 * @typedef {Object} Subcategory
 * @property {string} id - Unique identifier for the subcategory
 * @property {string} name - Name of the subcategory
 * @property {string} parentCategory - ID of the parent category
 */

/**
 * @typedef {Object} Review
 * @property {string} id - Unique identifier for the review
 * @property {string} userId - ID of the user who wrote the review
 * @property {string} userName - Name of the user who wrote the review
 * @property {string} productId - ID of the reviewed product
 * @property {number} rating - Rating given (0-5)
 * @property {string} title - Title of the review
 * @property {string} comment - Review comment
 * @property {Date} date - Date the review was posted
 * @property {boolean} verified - Whether the review is verified
 * @property {number} helpful - Number of users who found the review helpful
 */

/**
 * @typedef {Object} HealthAlert
 * @property {'warning' | 'info' | 'danger'} type - Type of alert
 * @property {string} message - Alert message
 * @property {string} reason - Reason for the alert
 * @property {'low' | 'medium' | 'high'} severity - Severity of the alert
 */