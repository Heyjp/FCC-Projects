var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  Name: String,
  City: String,
  State: String,
});


// Get user by id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// Get user by username
module.exports.getUserByUsername = function(username, callback){
	User.findOne({username: username}, callback);
}

// Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err){
			return callback(err);
		} else {
			callback(null, isMatch);
		}
	});
}

// Add user
module.exports.addUser = function(user, callback){
	User.create(user, callback);
}

module.exports.getUserbyId = function(id, callback) {
  User.findById(id, callback); // findbyID a mongoose method
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
