var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var budgetSchema = new Schema({
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'cash' : Number,
	'card' : Number
});

module.exports = mongoose.model('budget', budgetSchema, 'Budget');
