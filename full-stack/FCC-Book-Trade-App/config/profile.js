var User = require('../models/user.js');
var mongoose = require('mongoose')

module.exports = {};

module.exports.updateUserProfile = function (user, field, callback) {
  User.findOneAndUpdate({username: user}, {$set: field}, {new: true}, function (err, data) {
    if (err) {
      callback(false)
    }
    // Object with just the updated details
    let newProfile = {
      Name: data.Name,
      City: data.City,
      State: data.State
    }
    callback(null, newProfile)
  })
}

module.exports.getProfile = function (user, callback) {
  User.findOne({username: user}, "Name City State", function (err, data) {
    if (err) {
      console.log(err)
    }  
    callback(null, data);
  });
}
