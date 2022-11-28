var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var jwt = require('jsonwebtoken');

var Location = require('../config/guestlist');
var ySearch = require('../config/yelp');
var User = require('../models/users');
var Utils = require('../utils/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/*', function (req, res) {
  res.redirect('/');
});

// AJAX request
router.post('/search/', function (req, res) {
      let location = req.body.city;
      req.session.lastSearch = location;

      ySearch.newLocalSearch(location, function (err, data) {
        if (err) {
          console.log(err, "here is the error");
          res.status(200).send(err);
        } else {
            // DATABASE QUERY IF SUCCESSFULL
            Location.queryGuestList(location, data, function (err, query) {
                if (err) {
                  console.log(err);
                  res.status(200).send("there was an error");
                }
                  res.status(200).json(query);
              });
            }
        });
  });


  router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function (err, user) {
      if (err) {
        console.log(err, "login error");
      }
      if (!user) {
        console.log("user details is false");
      } else {
        req.session.user = user.username;
        let sig = jwt.sign({id: user.username}, "keyboard cat");
        res.status(200)
        .cookie('token', sig, { expires: new Date(Date.now() + 900000)})
        .send(user.username);
      }
    })(req, res, next);
  });

  router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function (err, user) {
      if (err) {
        console.log(err, "signup error");
      }
      if (!user) {
        console.log("user already exists is false");
      } else {
        req.session.user = user.username;

        let sig = jwt.sign({id: user.username}, "keyboard cat");
        res.status(200)
        .cookie('token', sig, { expires: new Date(Date.now() + 900000)})
        .send(user.username);
      }
    })(req, res, next);
  });

  // Adding and Removing attendance
  router.post('/check', function (req, res) {
    let token = jwt.verify(req.cookies.token, 'keyboard cat');

    if(token.id === req.session.user) {
      let id = req.body.id;
      let city = req.body.city;
      let user = req.session.user;

      Location.addOrRemoveUser(id, city, user, function (err, msg, result) {
          if (err) {
            console.log(err);
            res.status(500).send("there was a server error");
          }
          else {
            res.status(200).send({guestList: result});
          }
      });

    } else {
          res.status(200).send({status: "bad id"});
       }
  });


router.post('/logout', function (req, res) {
  if (req.session.user) {
    delete req.session.user
    res.clearCookie('token');
    req.logout();
    res.status(200).send('logged out');
  } else {
    res.status(200).send('not loggedin')
  }
});

router.post('/user', function (req, res) {

  if (!req.cookies.token) {
    return res.status(200).send({user: false});
  }

  if (req.cookies.token) {
    let token = jwt.verify(req.cookies.token, 'keyboard cat');
    if (token.id === req.session.user) {
      return res.status(200).send({user: req.session.user});
    } else {
      return res.status(200).send({user: false});
    }
  }
});


router.post('/query', function (req, res) {

    if (req.session.lastSearch && req.session.user) {
      return res.status(200).send({location: req.session.lastSearch})
    } else {
      return res.status(200).send({location: ''})
    }

});

module.exports = router;
