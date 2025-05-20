const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,min:3},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true,min:4,max:10},
  createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);