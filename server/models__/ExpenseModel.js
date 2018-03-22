var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ExpenseSchema = new Schema({
	'_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'INSERT_YOUR_REFERENCE_NAME_HERE'
	},
	'comment' : String,
	'amount' : Number,
	'payer' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'chargedTo' : Array,
	'method' : String,
	'unit' : String,
	'datetime' : Date
});

module.exports = mongoose.model('Expense', ExpenseSchema);
