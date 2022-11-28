var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    location: String,
    id: String,
    guestlist: [],
});


module.exports = mongoose.model('Location', schema);
