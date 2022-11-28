var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'vx1odQoqzc7qDJfy2WL_ng',
  consumer_secret: 'Jv7bD1lTfdkgl21QqVvKkkdyrNQ',
  token: '7YGyq58kpunM2fpzleCgC3Mam8TrU4Xj',
  token_secret: 'uIwSxiJDv3tyJ3tDuLDF2IIfmB4',
});


 var exports = module.exports = {};

exports.newLocalSearch = function (location, callback) {

  yelp.search({ location: location, category_filter: "bars"}).then(function (data) {
    callback(null, data);
  }).catch(function (err) {
    callback(err, err);
  });

}
