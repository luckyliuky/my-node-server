const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  openid: {
    type: String,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
