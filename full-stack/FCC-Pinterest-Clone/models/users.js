var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema ({

  username    : String,
  image       : String,

});

userSchema.methods.findOrCreateUser = function (user, callback) {
  userSchema.find({username: user}, callback);
}

module.exports = mongoose.model('User', userSchema);
