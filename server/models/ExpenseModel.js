const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Define Schemes
const expenseSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  comment: { type: String },
  amount: { type: Number },
  payer: { type: Schema.Types.ObjectId, ref: 'User' },
  chargedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  method: { type: String },
  unit: { type: String },
  datetime: { type: Date }
},
{
  timestamps: true
});

// Create Model & Export
module.exports = mongoose.model('Expense', expenseSchema, 'Expense')