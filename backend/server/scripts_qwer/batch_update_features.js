// Batch update product features using ResNet50 feature extraction service
// Usage: node batch_update_features.js

const envPath = require('path').resolve(__dirname, '../.env');
console.log('Attempting to load .env from:', envPath);
require('dotenv').config({ path: envPath });
console.log('All loaded env vars:', process.env);
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is undefined! Check your .env file at ' + envPath);
}
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
const mongoose = require('mongoose');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const PYTHON_SERVICE_URL = process.env.PYTHON_FEATURE_SERVICE_URL || 'http://127.0.0.1:5001/extract-features';

async function fetchImageBuffer(imageUrl) {
  // Handles both local paths and URLs
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } else {
    // Assume local file path relative to demo/server
    const absPath = path.isAbsolute(imageUrl) ? imageUrl : path.resolve(__dirname, '../', imageUrl);
    return fs.promises.readFile(absPath);
  }
}

async function extractFeatures(imageBuffer) {
  const response = await axios.post(
    PYTHON_SERVICE_URL,
    imageBuffer,
    {
      headers: { 'Content-Type': 'application/octet-stream' },
      timeout: 20000,
    }
  );
  return response.data.features;
}

async function updateAllProducts() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const products = await Product.find({});
  console.log(`Found ${products.length} products.`);

  let updated = 0;
  for (const product of products) {
    try {
      if (!product.imageUrl) {
        console.warn(`Skipping product ${product._id} (no imageUrl)`);
        continue;
      }
      const imageBuffer = await fetchImageBuffer(product.imageUrl);
      const features = await extractFeatures(imageBuffer);
      if (!Array.isArray(features) || features.length !== 2048) {
        throw new Error('Feature extraction returned invalid vector');
      }
      product.features = features;
      await product.save();
      updated++;
      console.log(`Updated product ${product._id} (${product.name})`);
    } catch (err) {
      console.error(`Failed to update product ${product._id}:`, err.message);
    }
  }
  console.log(`Batch update complete. Updated ${updated} products.`);
  await mongoose.disconnect();
}

updateAllProducts().catch(err => {
  console.error('Batch update failed:', err);
  process.exit(1);
});
