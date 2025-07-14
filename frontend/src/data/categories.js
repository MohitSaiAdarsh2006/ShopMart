export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones', parentCategory: 'electronics' },
      { id: 'laptops', name: 'Laptops', parentCategory: 'electronics' },
      { id: 'tablets', name: 'Tablets', parentCategory: 'electronics' },
      { id: 'headphones', name: 'Headphones', parentCategory: 'electronics' },
      { id: 'cameras', name: 'Cameras', parentCategory: 'electronics' },
      { id: 'gaming', name: 'Gaming', parentCategory: 'electronics' },
      { id: 'smart-home', name: 'Smart Home', parentCategory: 'electronics' },
      { id: 'wearables', name: 'Wearables', parentCategory: 'electronics' }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '👕',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing", parentCategory: 'fashion' },
      { id: 'womens-clothing', name: "Women's Clothing", parentCategory: 'fashion' },
      { id: 'shoes', name: 'Shoes', parentCategory: 'fashion' },
      { id: 'accessories', name: 'Accessories', parentCategory: 'fashion' },
      { id: 'bags', name: 'Bags & Luggage', parentCategory: 'fashion' },
      { id: 'jewelry', name: 'Jewelry', parentCategory: 'fashion' },
      { id: 'watches', name: 'Watches', parentCategory: 'fashion' }
    ]
  },
  {
    id: 'groceries',
    name: 'Groceries & Food',
    icon: '🛒',
    image: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=400',
    subcategories: [
      { id: 'fresh-produce', name: 'Fresh Produce', parentCategory: 'groceries' },
      { id: 'dairy', name: 'Dairy & Eggs', parentCategory: 'groceries' },
      { id: 'meat-seafood', name: 'Meat & Seafood', parentCategory: 'groceries' },
      { id: 'pantry', name: 'Pantry Staples', parentCategory: 'groceries' },
      { id: 'snacks', name: 'Snacks', parentCategory: 'groceries' },
      { id: 'beverages', name: 'Beverages', parentCategory: 'groceries' },
      { id: 'frozen', name: 'Frozen Foods', parentCategory: 'groceries' },
      { id: 'organic', name: 'Organic', parentCategory: 'groceries' }
    ]
  },
  {
    id: 'health-beauty',
    name: 'Health & Beauty',
    icon: '💄',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    subcategories: [
      { id: 'skincare', name: 'Skincare', parentCategory: 'health-beauty' },
      { id: 'makeup', name: 'Makeup', parentCategory: 'health-beauty' },
      { id: 'haircare', name: 'Hair Care', parentCategory: 'health-beauty' },
      { id: 'personal-care', name: 'Personal Care', parentCategory: 'health-beauty' },
      { id: 'vitamins', name: 'Vitamins & Supplements', parentCategory: 'health-beauty' },
      { id: 'medicines', name: 'Medicines', parentCategory: 'health-beauty' },
      { id: 'oral-care', name: 'Oral Care', parentCategory: 'health-beauty' }
    ]
  },
  {
    id: 'home-furniture',
    name: 'Home & Furniture',
    icon: '🏠',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    subcategories: [
      { id: 'furniture', name: 'Furniture', parentCategory: 'home-furniture' },
      { id: 'home-decor', name: 'Home Decor', parentCategory: 'home-furniture' },
      { id: 'kitchen', name: 'Kitchen & Dining', parentCategory: 'home-furniture' },
      { id: 'bedding', name: 'Bedding & Bath', parentCategory: 'home-furniture' },
      { id: 'storage', name: 'Storage & Organization', parentCategory: 'home-furniture' },
      { id: 'lighting', name: 'Lighting', parentCategory: 'home-furniture' },
      { id: 'garden', name: 'Garden & Outdoor', parentCategory: 'home-furniture' }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    icon: '⚽',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400',
    subcategories: [
      { id: 'fitness', name: 'Fitness Equipment', parentCategory: 'sports' },
      { id: 'outdoor-recreation', name: 'Outdoor Recreation', parentCategory: 'sports' },
      { id: 'team-sports', name: 'Team Sports', parentCategory: 'sports' },
      { id: 'water-sports', name: 'Water Sports', parentCategory: 'sports' },
      { id: 'cycling', name: 'Cycling', parentCategory: 'sports' },
      { id: 'running', name: 'Running', parentCategory: 'sports' }
    ]
  },
  {
    id: 'books',
    name: 'Books & Media',
    icon: '📚',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    subcategories: [
      { id: 'fiction', name: 'Fiction', parentCategory: 'books' },
      { id: 'non-fiction', name: 'Non-Fiction', parentCategory: 'books' },
      { id: 'textbooks', name: 'Textbooks', parentCategory: 'books' },
      { id: 'children-books', name: "Children's Books", parentCategory: 'books' },
      { id: 'ebooks', name: 'E-books', parentCategory: 'books' },
      { id: 'audiobooks', name: 'Audiobooks', parentCategory: 'books' }
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: '🚗',
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400',
    subcategories: [
      { id: 'car-parts', name: 'Car Parts', parentCategory: 'automotive' },
      { id: 'car-accessories', name: 'Car Accessories', parentCategory: 'automotive' },
      { id: 'tools', name: 'Tools & Equipment', parentCategory: 'automotive' },
      { id: 'car-care', name: 'Car Care', parentCategory: 'automotive' }
    ]
  }
];