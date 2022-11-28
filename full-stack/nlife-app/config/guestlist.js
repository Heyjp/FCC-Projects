var Location = require('../models/location');
var exports = module.exports = {};

exports.addOrRemoveUser = function (barId, barCity, user, callback) {
  var userName = user;
  var guestListLength;

   Location.findOne({id: barId}, function (err, info) {
     if (err) {
       console.log(err);
     }
     if (!info) {
       var location = new Location();
       location.location = barCity,
       location.id = barId,
       location.guestlist = [];
       location.guestlist.push(userName);
       location.save();

       guestListLength = location.guestlist.length;

       callback(null, "successfull added location & user", guestListLength);
     } else if (info) {
             if (info.guestlist.indexOf(userName) === -1) {

               Location.findOneAndUpdate({id: barId}, {$push: { guestlist: userName } }, {new: true}, function (err, doc) {
                 guestListLength = doc.guestlist.length;
                 if (err) {
                   console.log(err);
                 }
                 callback(null, "User added to the guestList", guestListLength);
               });
           } else if (info.guestlist.indexOf(userName) !== -1) {

             Location.findOneAndUpdate({id: barId}, {$pull: { guestlist: userName } }, {new: true}, function (err, doc) {
               guestListLength = doc.guestlist.length;
               if (err) {
                 console.log(err);
               }
               callback(null, "user pulled from the guestlist", guestListLength);
             });
           }
      }
  });

}

  exports.queryGuestList = function (location, bars, callback) {

    // If there are any bars that have people attending it is listed here
    Location.find({}, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          // append the guestList Length to the YELP object for front end attendance list
          var guestList = compareObjects(data, bars);
          callback(null, guestList);
        }
      });
  };

function compareObjects (data, bars) {
  bars.businesses.forEach(function (element, index) {
    element.guestListLength = 0;
    for (var i = 0; i < data.length; i++) {
      if (element.id === data[i].id) {
        element.guestListLength = data[i].guestlist.length;
      }
    }
  })
  return bars;
}
