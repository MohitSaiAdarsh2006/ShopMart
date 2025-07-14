const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  subcategory: { type: String },
  imageUrl: { type: String }, // Unified field for image
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  tags: [{ type: String }],
  nutrition: { type: mongoose.Schema.Types.Mixed },
  features: [{ type: Number }], // 2048-dim feature vector
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: 'Products'
});

module.exports = mongoose.model('Product', ProductSchema);
