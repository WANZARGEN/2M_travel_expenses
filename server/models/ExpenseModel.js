const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Define Schemes
const expenseSchema = new mongoose.Schema({
  comment: { type: String },
  amount: { type: Number },
  // payer: { type: Number },
  // chargedTo: { type: Number },
  payer: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  chargedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  method: { type: String },
  unit: { type: Number },
  date: { type: String },
  time: { type: String }
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Expense', expenseSchema, 'Expense')