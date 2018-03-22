var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'_id' : {
	 	type: Schema.Types.ObjectId
	},
	'email' : String,
	'password' : String,
	'name' : String
});

module.exports = mongoose.model('User', UserSchema);
