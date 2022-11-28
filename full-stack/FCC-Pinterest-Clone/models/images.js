var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
  user: String,
  avatar: String,
  images: [{
    title: String,
    url: String,
    userLikes: []
  }]
});

module.exports = mongoose.model('Image', imageSchema);
