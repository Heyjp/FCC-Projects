var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs')
var User = require('../models/user.js');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!isValidPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.use('local-signup', new LocalStrategy({
  passReqToCallback: true
},
  function(req, username, password, done){
    findOrCreateUser = function(){
      // Find a user with this username
      User.findOne({username: username}, function(err, user){
        if(err){
          console.log('Error: '+err);
          return done(err);
        }
        // Does user exist?
        if(user){
          console.log('That user already exists');
          return done(null, false);
        } else {
          var newUser = new User();

          newUser.username = username;
          newUser.password = createHash(password);

          newUser.save();
          done(null, newUser);
        }
      });
    };
    process.nextTick(findOrCreateUser);
  }
));

  var isValidPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);
  }

  var createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }
}
