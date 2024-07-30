const mongoose = require('mongoose');
const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // 启用自动创建 `createdAt` 和 `updatedAt` 字段
});

const House = mongoose.model('House', houseSchema);

module.exports = House;