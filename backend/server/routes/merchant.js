// server/routes/merchant.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isMerchant = require('../middleware/isMerchant');
const Product = require('../models/Product');

// Create a product
router.post('/products', auth, isMerchant, async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body, createdBy: req.user });
    await newProduct.save();
    res.status(201).json({ msg: 'Product created', product: newProduct });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating product', error: err.message });
  }
});

// Get all products by this merchant
router.get('/products', auth, isMerchant, async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching products' });
  }
});

// Update a product
router.put('/products/:id', auth, isMerchant, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.createdBy.toString() !== req.user) {
      return res.status(403).json({ msg: 'Unauthorized to update this product' });
    }
    Object.assign(product, req.body);
    await product.save();
    res.json({ msg: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating product', error: err.message });
  }
});

// Delete a product
router.delete('/products/:id', auth, isMerchant, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.createdBy.toString() !== req.user) {
      return res.status(403).json({ msg: 'Unauthorized to delete this product' });
    }
    await product.deleteOne();
    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting product', error: err.message });
  }
});

module.exports = router;
