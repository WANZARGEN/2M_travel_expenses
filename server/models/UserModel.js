const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schemes
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('User', userSchema, 'User')