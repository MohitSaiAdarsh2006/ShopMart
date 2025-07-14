const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

// GET /api/wishlist
router.get('/', auth, (req, res) => {
  res.json(req.user.wishlist);
});

// POST /api/wishlist/:productId (toggle)
router.post('/:productId', auth, async (req, res) => {
  const productId = req.params.productId;
  const index = req.user.wishlist.indexOf(productId);

  if (index > -1) {
    req.user.wishlist.splice(index, 1);
  } else {
    req.user.wishlist.push(productId);
  }

  await req.user.save();
  res.json(req.user.wishlist);
});

module.exports = router;
