var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');
var bcrypt = require('bcryptjs');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
  done(null, user.id);
});

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

    passport.use('local-login', new LocalStrategy({
      passReqToCallback: true
    },
      function(req, username, password, done) {
        User.findOne({ username: username }, function(err, user) {

          if (err) {
            console.log(err, "this is err in login")
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
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

            if(req.session.lastSearch) {
              newUser.location = req.session.lastSearch;
            }

					  newUser.save();

            return done(null, newUser);
            done(null, newUser);
					}
				});
			};
			process.nextTick(findOrCreateUser);
		}
	));

}

var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}

var createHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
