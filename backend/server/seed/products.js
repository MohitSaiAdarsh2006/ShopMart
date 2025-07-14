const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedProducts = async () => {
  await Product.deleteMany();

  await Product.insertMany([
    {
      name: 'Organic Almond Butter',
      brand: 'HealthySpread',
      price: 499,
      category: 'Groceries',
      subcategory: 'Nut Butters',
      image: 'https://example.com/image.jpg',
      description: 'Creamy almond butter with no added sugar.',
      tags: ['organic', 'vegan', 'low-sodium'],
      nutrition: { calories: 180, fat: 16, sugar: 1, sodium: 2, protein: 7, fiber: 3 }
    },
    {
      name: 'Gluten-Free Pasta',
      brand: 'Wheatless',
      price: 299,
      category: 'Groceries',
      subcategory: 'Pasta',
      image: 'https://example.com/image2.jpg',
      description: 'Made from rice and corn flour.',
      tags: ['gluten-free', 'vegan'],
      nutrition: { calories: 210, fat: 2, sugar: 0, sodium: 5, protein: 6, fiber: 2 }
    }
  ]);

  console.log('Products seeded');
  process.exit();
};

seedProducts();
