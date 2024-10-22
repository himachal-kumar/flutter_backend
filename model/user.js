const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: Number, default: 0 } // 0 = inactive, 1 = active
});

// Create the User model
const User = mongoose.model('User', userSchema);


module.exports = User;
