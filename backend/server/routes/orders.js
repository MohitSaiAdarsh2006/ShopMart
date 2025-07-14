const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
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

// POST /api/orders – Place order from cart
router.post('/', auth, async (req, res) => {
  const cart = req.user.cart;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ msg: 'Cart is empty' });
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * 100, 0); // (Use actual prices if needed)

  const order = new Order({
    user: req.user._id,
    items: cart,
    totalPrice
  });

  await order.save();

  // Clear user's cart
  req.user.cart = [];
  await req.user.save();

  res.json({ msg: 'Order placed', order });
});

// GET /api/orders – Get user’s order history
router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
});

module.exports = router;
