// Integrated from qwer/backend/controllers/similarityController.js
// Provides image similarity search endpoints for AI Image Search

const path = require('path');
const axios = require('axios');

exports.similaritySearch = async (req, res) => {
  // Example: expects image file in req.file
  try {
    // Call python_feature_service or perform similarity logic here
    // 1. Check if file is present
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded.' });
    }

    // 2. Send image to Python feature service (ResNet50, 2048-dim)
    let features;
    try {
      const featureResp = await axios.post(
        'http://127.0.0.1:5001/extract-features',
        req.file.buffer,
        {
          headers: { 'Content-Type': 'application/octet-stream' },
          responseType: 'json'
        }
      );
      features = featureResp.data.features;
      if (!Array.isArray(features)) throw new Error('Invalid features from Python service');
    } catch (err) {
      return res.status(500).json({ error: 'Feature extraction failed: ' + err.message });
    }

    // Log extracted features
    console.log('[AI Search] Extracted features:', features);

    // 3. Fetch all products with features from MongoDB
    const Product = require('../models/Product');
    const products = await Product.find({ features: { $exists: true, $ne: [] } });

    // 4. Compute cosine similarity and find best match
    function cosineSimilarity(a, b) {
      let dot = 0.0, normA = 0.0, normB = 0.0;
      for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
      }
      return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }
    let bestProduct = null;
    let bestSimilarity = -1;
    for (const p of products) {
      if (!Array.isArray(p.features) || p.features.length !== features.length) continue;
      const sim = cosineSimilarity(features, p.features);
      if (sim > bestSimilarity) {
        bestSimilarity = sim;
        bestProduct = p;
      }
    }
    const SIMILARITY_THRESHOLD = 0.7;
    if (!bestProduct || bestSimilarity < SIMILARITY_THRESHOLD) {
      return res.status(404).json({ error: 'No results found' });
    }

    // Patch imageUrl for frontend if needed
    let productObj = bestProduct.toObject ? bestProduct.toObject() : { ...bestProduct };
    if (productObj.imageUrl && !/^https?:\/\//.test(productObj.imageUrl)) {
      productObj.imageUrl = `/images/${productObj.imageUrl}`;
    }

    res.json({ product: productObj });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
