var TwitterStrategy  = require('passport-twitter').Strategy;

var User = require('../models/users.js');
var configAuth = require('./auth');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
      done(null, id);
  });

  passport.use(new TwitterStrategy({
      consumerKey     : configAuth.twitterAuth.consumerKey,
      consumerSecret  : configAuth.twitterAuth.consumerSecret,
      callbackURL     : configAuth.twitterAuth.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      console.log("authing is running", token, tokenSecret, profile);

      process.nextTick(function () {
        console.log("process.nexttck is running")
        User.findOne({username: profile.username}, function(err, user) {

            console.log("user find one", user);
        if (err) {
          console.log("error found cancelling", err);
          return done(err);
        }
          else if (user) {
            console.log(user, "userfound!");
            return done(null, user);
          } else {
            console.log("creating new user for DB")
            // Create new user
            var newUser = new User();
            newUser.username = profile.username;
            newUser.image = profile.photos[0].value;

            newUser.save(function (user) {
              return done(null, user);
            });
          }
        });
      })
  }));

}
