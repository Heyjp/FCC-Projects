var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({

  firstOwner: String,
  owner: String,
  title: String,
  image: String,
  TradeRequest: Boolean,
  Requester: String,

});

module.exports = mongoose.model('Trade', bookSchema);
