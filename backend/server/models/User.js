const mongoose = require('mongoose');

const HealthProfileSchema = new mongoose.Schema({
  isDiabetic: { type: Boolean, default: false },
  isNutAllergic: { type: Boolean, default: false },
  isGlutenIntolerant: { type: Boolean, default: false },
  isLowSodium: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  isVegetarian: { type: Boolean, default: false },
  isKeto: { type: Boolean, default: false },
  customAllergies: [String],
  dietaryRestrictions: [String]
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: {
    type: String,
    enum: ['customer', 'merchant'],
    default: 'customer'
  },
  healthProfile: { type: HealthProfileSchema, default: {} },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
