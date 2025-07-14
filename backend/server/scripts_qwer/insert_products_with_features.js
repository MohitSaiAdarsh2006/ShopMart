// Script to insert new products into shopmart.products and add image features
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopmart';

// Example products with public image URLs
const products = [
  {
    name: 'Organic Almond Butter',
    brand: 'HealthySpread',
    price: 499,
    description: 'Creamy almond butter with no added sugar.',
    category: 'Groceries',
    subcategory: 'Nut Butters',
    imageUrl: 'almond.jpg',
    inStock: true,
    rating: 4.7,
    tags: ['organic', 'vegan', 'low-sodium'],
    nutrition: {
      calories: 180,
      fat: 16,
      sugar: 1,
      sodium: 2,
      protein: 7,
      fiber: 3
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Natural Peanut Butter',
    brand: 'NutriPure',
    price: 299,
    description: 'All-natural peanut butter with no preservatives.',
    category: 'Groceries',
    subcategory: 'Nut Butters',
    imageUrl: 'peanut.jpg',
    inStock: true,
    rating: 4.8,
    tags: ['natural', 'gluten-free'],
    nutrition: {
      calories: 190,
      fat: 17,
      sugar: 2,
      sodium: 3,
      protein: 8,
      fiber: 2
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const fs = require('fs');
const path = require('path');

async function fetchImageBuffer(filename) {
  const imagePath = path.join(__dirname, '../images', filename);
  return fs.readFileSync(imagePath);
}

async function extractFeatures(imageBuffer) {
  const response = await axios.post('http://127.0.0.1:5001/extract-features', imageBuffer, {
    headers: { 'Content-Type': 'application/octet-stream' },
    responseType: 'json',
  });
  return response.data.features;
}

async function run() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const Product = mongoose.connection.collection('Products');
  let count = 0;
  for (const prod of products) {
    try {
      const imgBuffer = await fetchImageBuffer(prod.imageUrl);
      const features = await extractFeatures(imgBuffer);
      prod.features = features;
      await Product.insertOne(prod);
      console.log(`Inserted: ${prod.name}`);
      count++;
    } catch (err) {
      console.error(`Failed for ${prod.name}:`, err.message);
    }
  }
  await mongoose.disconnect();
  console.log(`Done. Inserted ${count} products.`);
}

run();
