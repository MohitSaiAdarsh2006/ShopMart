const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
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

// POST /api/reviews/:productId
router.post('/:productId', auth, async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find(r =>
    r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) return res.status(400).json({ msg: 'Already reviewed' });

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment
  };

  product.reviews.push(review);
  product.reviewCount = product.reviews.length;
  product.averageRating = (
    product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviewCount
  ).toFixed(1);

  await product.save();
  res.json({ msg: 'Review added', reviews: product.reviews });
});

// GET /api/reviews/:productId
router.get('/:productId', async (req, res) => {
  const product = await Product.findById(req.params.productId)
    .populate('reviews.user', 'name');
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  res.json(product.reviews);
});

module.exports = router;
