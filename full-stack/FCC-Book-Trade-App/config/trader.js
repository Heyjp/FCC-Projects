var mongoose = require('mongoose');
var Trade = require('../models/books.js');

module.exports = {};


module.exports.booksAvailable = function (data, callback) {

  Trade.find({}, "title image owner", function (err, doc) {
    if (err) {
      callback(err);
    }
    callback(null, doc);
  });
}

module.exports.showLibrary = function (user, callback) {

  Trade.find({owner: user}, "title image", function (err, doc) {
    if (err) {
      callback(err);
    }
      callback(null, doc);
  });
}


module.exports.addBook = function (user, obj, callback) {

  var newBook = new Trade();
  newBook.firstOwner = user;
  newBook.owner = user;
  newBook.title = obj.title;
  newBook.image = obj.image;
  newBook.TradeRequest = false;

  newBook.save(function (err) {
    if (err){
      throw err
    }
    callback(null, newBook);
  })
}

// Take a Book from the selection and ask for trade
module.exports.requestTrade = function (obj, callback) {

  if (obj.owner === obj.user ) {
    return callback(false)
  }

Trade.update({ _id: obj._id }, {TradeRequest: true, Requester: obj.user }, function (err, data) {

  if (err) {
  return callback(err);
  }

  return callback(null, data);
});
}

// for library page, list all the trades that are being asked of you
  module.exports.findIncTrades = function (user, callback) {
    Trade.find({owner: user, TradeRequest: true}, function (err, doc) {
        if (err) {
          callback(err);
        }
        return callback(null, doc);
    })
  }

// also for library page find all the trades that you are asking for
  module.exports.findOutTrades = function (user, callback) {
    Trade.find({Requester: user}, function (err, doc) {
        if (err) {
        return callback(err);
        }
      return callback(null, doc);
    })
  }

  // Accept or cancel trade requests
  module.exports.handleTradeRequest = function (data, user, callback) {
    /*
      console.log("trade request handling", data, user);
        if (obj.cancel === true) {
          console.log("cancel running");
          Trade.update({ _id: obj.id, title: obj.title }, {TradeRequest: false, Requester: null}, function (err, doc) {
            if (err) {
              callback(err);
            }
            callback(null, doc);
          })
        }
    */
    console.log(data, user, "data and user on handleTradeRequest.")

    if (data.cancel) {
      console.log("cancel running");
      Trade.update({ _id: data._id, title: data.title }, {TradeRequest: false, Requester: null}, function (err, doc) {
        if (err) {
          callback(err);
        }
        callback(null, doc);
      })
    } else {

      Trade.find({_id: data._id}, function (err, file) {
        console.log(file, "file, in trade.find")
        let newUser = file[0].Requester;

        Trade.update({ _id: data._id, Requester: newUser},
          {owner: newUser, TradeRequest: false, Requester: null},
          function (err, data) {
            if (err) {
              console.log(err);
              callback(err);
            }
              callback(null, data);
          }
        )
      })
    }
  }

  module.exports.cancelBookRequest = function (user, book, callback) {

    Trade.update({_id: book.id, Requester: user}, {Requester: undefined, TradeRequest: false}, function (err, doc) {
        if (err) {
          callback(err)
        }
        callback(null, doc);
    })
  }

  function filterUser (user, obj) {
   obj.forEach(function (ele) {
     if (ele.owner == user) {
       ele.TradeRequest = true;
     }
   });
   return obj;
 }
