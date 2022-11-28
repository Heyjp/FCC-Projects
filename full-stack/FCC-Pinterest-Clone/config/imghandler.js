var Image = require('../models/images.js');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
module.exports = {};

module.exports.storeImage = function (user, img, callback) {
    Image.find({user: user.username}, function (err, doc) {
      if (err) {
        console.log(err);
      }
      if (doc.length < 1) {
        console.log("no doc");
        var newArray = [];
        var obj = {
          title: img.name,
          url: img.url,
          userLikes: []
        };
        newArray.push(obj);
        var newDoc = new Image();
        newDoc.user = user.username;
        newDoc.avatar = user.image;
        newDoc.images = newArray;
        newDoc.save(function (info) {
          callback(null, info);
        });
      } else {
        console.log("doc exists");
        var newObj = {};
        newObj.url = img.url;
        newObj.title = img.name;
        newObj.userLikes = [];
        Image.update({user: user.username}, {$push: {images: newObj}}, function (err, data) {

          if (err) {
            console.log(err);
          }
          callback(null, data);
        });
      }
    });
};


module.exports.deleteImg = function (user, id, callback) {

  Image.update({user: user.username}, {$pull: {images: {_id: id }}} ,function (err, doc) {
      callback(null, "success");
  });

}

module.exports.showImages = function (user, callback) {
      if (user === null) {
      Image.find({}, "user avatar images", function (err, doc) {
        callback(null, doc);
      });
    } else {
      Image.find({user: user.username}, function (err, doc) {
        callback(null, doc);
      });
  }
}

module.exports.userImages = function (user, callback) {
      Image.find({user: user}, function (err, doc) {
        callback(null, doc);
      });
  }

module.exports.addOrRemoveUser = function (user, id, callback) {

     Image.find({user: user}, "images", function (err, doc) {
            var likes;
            var key;
            var addToSet = {};
            var pullFromSet = {};
            var query = {};
            doc[0].images.forEach(function (ele, index) {

                if (ele._id == id) {
                  key = "images." + index +".userLikes";
                  query[key] = user;
                  addToSet.$addToSet = query;
                  pullFromSet.$pull = query;
                  if (ele.userLikes.indexOf(user) === -1) {
                    console.log("Added");
                    Image.findOneAndUpdate({user: user}, addToSet, {new: true}, function (err, info) {
                      likes = info.images[index].userLikes.length;
                      callback(null, likes);
                    });
                  } else {
                    console.log("removed");
                    Image.findOneAndUpdate({user: user}, pullFromSet, {new: true}, function (err, info) {
                      likes = info.images[index].userLikes.length;
                      callback(null, likes)
                    });
                  }
                }
            });

  });
};
