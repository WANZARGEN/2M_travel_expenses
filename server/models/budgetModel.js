var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BudgetSchema = new Schema({
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'cash' : Number,
	'card' : Number
});

module.exports = mongoose.model('Budget', BudgetSchema, 'Budget');
