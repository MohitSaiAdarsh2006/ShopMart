export const products = [
  // Electronics
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
    price: 134900,
    originalPrice: 139900,
    images: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviews: 2847,
    inStock: true,
    stockCount: 25,
    tags: ['flagship', 'premium', '5g', 'wireless-charging'],
    healthTags: [],
    specifications: {
      'Display': '6.7" Super Retina XDR',
      'Processor': 'A17 Pro',
      'Storage': '256GB',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Battery': 'Up to 29 hours video playback',
      'OS': 'iOS 17'
    },
    features: ['Face ID', 'Wireless Charging', 'Water Resistant', '5G Ready'],
    warranty: '1 year limited warranty',
    returnPolicy: '30-day return policy',
    shippingInfo: 'Free shipping on orders over ₹500'
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: 'Supercharged by M2 chip. Incredibly thin and light laptop with all-day battery life.',
    price: 114900,
    originalPrice: 119900,
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    rating: 4.7,
    reviews: 1523,
    inStock: true,
    stockCount: 15,
    tags: ['ultrabook', 'premium', 'lightweight'],
    healthTags: [],
    specifications: {
      'Display': '13.6" Liquid Retina',
      'Processor': 'Apple M2',
      'RAM': '8GB',
      'Storage': '256GB SSD',
      'Battery': 'Up to 18 hours',
      'Weight': '1.24 kg'
    },
    features: ['Touch ID', 'Backlit Keyboard', 'Force Touch Trackpad', 'Thunderbolt Ports'],
    warranty: '1 year limited warranty',
    returnPolicy: '30-day return policy'
  },

  // Groceries & Food
  {
    id: '3',
    name: 'Organic Whole Wheat Bread',
    description: 'Fresh baked organic whole wheat bread with no preservatives. Perfect for a healthy breakfast.',
    price: 89,
    originalPrice: 110,
    images: [
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'groceries',
    subcategory: 'pantry',
    brand: 'Nature\'s Best',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    stockCount: 50,
    nutritionInfo: {
      calories: 80,
      protein: '4g',
      carbs: '15g',
      fat: '1g',
      fiber: '3g',
      sodium: '160mg'
    },
    ingredients: ['Organic whole wheat flour', 'Water', 'Yeast', 'Salt', 'Organic honey'],
    tags: ['organic', 'whole-grain', 'no-preservatives'],
    healthTags: ['contains-gluten'],
    returnPolicy: '7-day return policy for perishables'
  },
  {
    id: '4',
    name: 'Sugar-Free Chocolate Cookies',
    description: 'Delicious chocolate cookies sweetened with stevia. Perfect for diabetic-friendly diets.',
    price: 156,
    originalPrice: 180,
    images: [
      'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'groceries',
    subcategory: 'snacks',
    brand: 'HealthySweet',
    rating: 4.3,
    reviews: 87,
    inStock: true,
    stockCount: 30,
    nutritionInfo: {
      calories: 45,
      protein: '2g',
      carbs: '8g',
      fat: '2g',
      fiber: '1g',
      sodium: '35mg'
    },
    ingredients: ['Almond flour', 'Cocoa powder', 'Stevia', 'Eggs', 'Butter'],
    tags: ['sugar-free', 'diabetic-friendly', 'low-carb'],
    healthTags: ['sugar-free', 'keto-friendly'],
    returnPolicy: '7-day return policy for perishables'
  },
  {
    id: '5',
    name: 'Mixed Nuts Trail Mix',
    description: 'Premium trail mix with almonds, cashews, and peanuts. High in protein and healthy fats.',
    price: 245,
    images: [
      'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'groceries',
    subcategory: 'snacks',
    brand: 'NutriMix',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    stockCount: 40,
    nutritionInfo: {
      calories: 160,
      protein: '6g',
      carbs: '6g',
      fat: '14g',
      fiber: '3g',
      sodium: '0mg'
    },
    ingredients: ['Almonds', 'Cashews', 'Peanuts', 'Raisins'],
    tags: ['high-protein', 'natural', 'energy-boost'],
    healthTags: ['contains-nuts', 'contains-peanuts', 'high-fat'],
    returnPolicy: '7-day return policy for perishables'
  },
  {
    id: '6',
    name: 'Regular Cola Drink',
    description: 'Classic cola beverage with refreshing taste. Contains high sugar content.',
    price: 45,
    images: [
      'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'groceries',
    subcategory: 'beverages',
    brand: 'CoolCola',
    rating: 4.1,
    reviews: 543,
    inStock: true,
    stockCount: 100,
    nutritionInfo: {
      calories: 140,
      protein: '0g',
      carbs: '39g',
      fat: '0g',
      fiber: '0g',
      sodium: '45mg'
    },
    ingredients: ['Carbonated water', 'High fructose corn syrup', 'Caramel color', 'Phosphoric acid', 'Caffeine'],
    tags: ['carbonated', 'caffeinated', 'refreshing'],
    healthTags: ['high-sugar', 'high-carbs', 'contains-caffeine'],
    returnPolicy: '7-day return policy for perishables'
  },

  // Health & Beauty
  {
    id: '7',
    name: 'Vitamin D3 Tablets',
    description: 'Essential Vitamin D3 supplement for bone health and immunity. 1000 IU per tablet.',
    price: 320,
    originalPrice: 380,
    images: [
      'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'health-beauty',
    subcategory: 'vitamins',
    brand: 'WellHealth',
    rating: 4.6,
    reviews: 298,
    inStock: true,
    stockCount: 75,
    ingredients: ['Vitamin D3', 'Microcrystalline cellulose', 'Magnesium stearate'],
    tags: ['vitamin', 'bone-health', 'immunity', 'supplement'],
    healthTags: ['supplement', 'vitamin'],
    specifications: {
      'Dosage': '1000 IU per tablet',
      'Quantity': '60 tablets',
      'Serving Size': '1 tablet daily'
    },
    returnPolicy: '30-day return policy'
  },
  {
    id: '8',
    name: 'Anti-Hair Fall Shampoo',
    description: 'Advanced formula shampoo with biotin and keratin to reduce hair fall and strengthen hair.',
    price: 299,
    originalPrice: 350,
    images: [
      'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'health-beauty',
    subcategory: 'haircare',
    brand: 'HairStrong',
    rating: 4.4,
    reviews: 412,
    inStock: true,
    stockCount: 60,
    ingredients: ['Biotin', 'Keratin', 'Argan Oil', 'Vitamin E', 'Natural Extracts'],
    tags: ['hair-fall', 'strengthening', 'biotin', 'keratin'],
    healthTags: ['sulfate-free', 'paraben-free'],
    specifications: {
      'Volume': '300ml',
      'Hair Type': 'All hair types',
      'Key Benefits': 'Reduces hair fall, Strengthens hair'
    },
    returnPolicy: '30-day return policy'
  },

  // Fashion
  {
    id: '9',
    name: 'Cotton Casual T-Shirt',
    description: 'Comfortable 100% cotton t-shirt perfect for everyday wear. Available in multiple colors.',
    price: 599,
    originalPrice: 799,
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'fashion',
    subcategory: 'mens-clothing',
    brand: 'ComfortWear',
    rating: 4.2,
    reviews: 189,
    inStock: true,
    stockCount: 45,
    tags: ['cotton', 'casual', 'comfortable', 'everyday'],
    healthTags: [],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular Fit',
      'Care': 'Machine Wash',
      'Sizes': 'S, M, L, XL, XXL'
    },
    returnPolicy: '30-day return policy'
  },
  {
    id: '10',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning and breathable mesh upper.',
    price: 2999,
    originalPrice: 3499,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'fashion',
    subcategory: 'shoes',
    brand: 'SportMax',
    rating: 4.6,
    reviews: 324,
    inStock: true,
    stockCount: 35,
    tags: ['running', 'lightweight', 'cushioned', 'breathable'],
    healthTags: [],
    specifications: {
      'Upper Material': 'Breathable Mesh',
      'Sole': 'EVA Foam',
      'Weight': '280g (per shoe)',
      'Sizes': '6-12 UK'
    },
    features: ['Shock Absorption', 'Anti-Slip Sole', 'Lightweight Design'],
    returnPolicy: '30-day return policy'
  },

  // Home & Furniture
  {
    id: '11',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support and adjustable height.',
    price: 8999,
    originalPrice: 10999,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'home-furniture',
    subcategory: 'furniture',
    brand: 'ComfortSeating',
    rating: 4.5,
    reviews: 156,
    inStock: true,
    stockCount: 20,
    tags: ['ergonomic', 'office', 'adjustable', 'comfortable'],
    healthTags: [],
    specifications: {
      'Material': 'Mesh Back, Fabric Seat',
      'Weight Capacity': '120kg',
      'Height Adjustment': '42-52cm',
      'Armrests': 'Adjustable'
    },
    features: ['Lumbar Support', 'Height Adjustable', 'Swivel Base', '5-Star Base'],
    warranty: '2 year warranty',
    returnPolicy: '30-day return policy'
  },

  // Sports
  {
    id: '12',
    name: 'Yoga Mat Premium',
    description: 'Non-slip premium yoga mat with extra cushioning for comfortable practice.',
    price: 1299,
    originalPrice: 1599,
    images: [
      'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'sports',
    subcategory: 'fitness',
    brand: 'YogaLife',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    stockCount: 55,
    tags: ['yoga', 'non-slip', 'cushioned', 'premium'],
    healthTags: ['eco-friendly', 'non-toxic'],
    specifications: {
      'Dimensions': '183cm x 61cm',
      'Thickness': '6mm',
      'Material': 'TPE (Thermoplastic Elastomer)',
      'Weight': '1.2kg'
    },
    features: ['Non-Slip Surface', 'Extra Cushioning', 'Lightweight', 'Easy to Clean'],
    returnPolicy: '30-day return policy'
  }
];