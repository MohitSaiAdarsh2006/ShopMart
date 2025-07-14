const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user || user.role !== 'merchant') {
      return res.status(403).json({ msg: 'Access denied. Merchant only.' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: 'Server error checking role' });
  }
};
