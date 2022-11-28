var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var User = new Schema({
    username: String,
    password: String,
    location: String
});


module.exports = mongoose.model('User', User);

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err){
			return callback(err);
		} else {
			callback(null, isMatch);
		}
	});
}

// Get user by id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// Add user
module.exports.addUser = function(user, callback){
	User.create(user, callback);
}
