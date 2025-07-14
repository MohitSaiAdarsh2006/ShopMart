const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware to get user from token
const auth = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(404).json({ msg: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

// GET /api/cart
router.get('/', auth, (req, res) => {
  res.json(req.user.cart);
});

// POST /api/cart
router.post('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const existing = req.user.cart.find(item => item.product.toString() === productId);

  if (existing) {
    existing.quantity = quantity;
  } else {
    req.user.cart.push({ product: productId, quantity });
  }

  await req.user.save();
  res.json(req.user.cart);
});

// DELETE /api/cart/:productId
router.delete('/:productId', auth, async (req, res) => {
  req.user.cart = req.user.cart.filter(item => item.product.toString() !== req.params.productId);
  await req.user.save();
  res.json(req.user.cart);
});

module.exports = router;
