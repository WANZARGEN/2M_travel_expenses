var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TravelSchema = new Schema({
	'_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'INSERT_YOUR_REFERENCE_NAME_HERE'
	},
	'traveller' : Array,
	'destination' : Array,
	'startDate' : Date,
	'endDate' : Date
});

module.exports = mongoose.model('Travel', TravelSchema);
