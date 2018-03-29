const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Define Schemes
const travelSchema = new mongoose.Schema({
  traveller: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  destination: [{ type: String }],
  startDate: { type: Date },
  endDate: { type: Date }
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Travel', travelSchema, 'Travel')