const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  isAdmin: { type: Boolean, default: false } // 新增字段：是否为管理员
});

const User = mongoose.model('User', userSchema);

module.exports = User;
