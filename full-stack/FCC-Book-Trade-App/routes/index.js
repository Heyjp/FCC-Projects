var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

var Trade = require('../config/trader.js');
var UserList = require('../config/profile.js');
var jwt = require ('jsonwebtoken')


/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index')
});

// get a collection of all the books in the database
router.get('/api/books', function (req, res) {
    Trade.booksAvailable(null, function (err, info) {
      if (err) {
        console.log(err, "there is an err");
      }
      console.log("no user")
      res.status(200).send(info);
    });
});

// Get the users personal library
router.get('/api/show-library', function (req, res) {
  let user = req.query.user
  Trade.showLibrary(user, function (err, info) {
    if (err) {
      console.log(err, "there is an");
    }
    console.log(info, "this is info");
    res.status(200).send(info);
  });
});


router.post('/api/request-book', function (req, res) {

  let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = token.id;
  console.log(token, "this is verified token")

  let data = req.body;

  console.log(data, user, "this is data and user on request-book")
  Trade.requestTrade(data, function (err, success) {
    if (err) {
    console.log(err);
    return res.status(400).send(err);
  } else if (!success) {
    return res.status(400).send("You already have that book");
  }

    return res.send("successfully requested");
  })

});


router.get('/api/login-check', function (req, res) {
  let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = token.id;
  res.status(200).send(user);
});


router.post('/api/accept-trade', function(req, res) {
  console.log("accept trade", req.body);
  let data = req.body;
  data.cancel = false;

  let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = token.id;
  console.log(token, "this is verified token")

    Trade.handleTradeRequest(data, user, function (err, success) {
      if (err) {
      return   console.log(err);
      }
      console.log(success, "this is success");
      return  res.status(200).send("accepted trade");
    });

});

router.post('/api/cancel-trade', function(req, res) {
  console.log("cancel-trade", req.body)
  let data = req.body;
  data.cancel = true;

  let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = token.id;
  console.log(token, "this is verified token")

  Trade.handleTradeRequest(data, user, function (err, success) {
    if (err) {
    return   console.log(err);
    }
    console.log(success, "this is success");
    return  res.status(200).send("accepted trade");
  });
});


// LOGIN ROUTES
router.post('/api/login', function (req, res, next) {
  console.log("login route post", req.body);

  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      console.log(err, "this is err in api/sig")
      return res.status(200).send({err: true})
     }
    if (!user) {
      console.log("user does not exist")
      return   res.status(200).send({user: false})
    }
    req.session.user = user.username;
    let sig = jwt.sign({id: user.username}, process.env.JWT_KEY);
    res.status(200)
    .cookie('token', sig, { expires: new Date(Date.now() + 900000)})
    .send({user: user.username})
  })(req, res, next);

});

router.post('/api/signup', function (req, res, next) {
  console.log("signup route post", req.body);

  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      console.log(err, "this is err in api/sig")
      return res.status(200).send(false)
     }
    if (!user) {
      console.log("user exists")
      return res.status(200).send({user: "found"})
    }

    req.session.user = user.username;
    let sig = jwt.sign({id: user.username}, process.env.JWT_KEY);

    return res.status(200)
    .cookie('token', sig, { expires: new Date(Date.now() + 900000)})
    .send({user: user.username});
  })(req, res, next);
});



router.get('/api/get-trades', function (req, res) {
    let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = token.id;
    console.log(token, "this is verified token")

    Trade.findIncTrades(user, function (err, trades) {
      var incTrades = trades;
      if (err) {
        return console.error(err);
      }

      Trade.findOutTrades(user, function (err, requests) {
        var outTrades = requests;
        if (err) {
        return  console.error(err);
        }
        return  res.status(200).send({inc: incTrades, out: outTrades});
      });
    });
});

router.post('/api/book-search', function (req, res) {

  let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = token.id;
  console.log(token, "this is verified token")

  const title = req.body.title;
  const author = req.body.author;
  let googleUrl = "https://www.googleapis.com/books/v1/volumes?q="

  // Filters results depending on whether a title or author is submitted
  if (!author) {
    googleUrl += title;
  } else {
    googleUrl += title + "+inauthor:" + author;
  }

  // Google API request
  request(googleUrl, function (error, response, body) {
    if (error) {
      console.log(err);
    } else if (!error && response.statusCode == 200) {
       // Take googlebooks data and parse it for use
       let bookResults = JSON.parse(body);

       // if the search comes up with no items send false response to user
       if (bookResults.totalItems === 0) {
         console.log("no items in search")
         return res.status(500).send(false);
       }
       // If 1 or more items is returned filter object to return infomation
       let list = createBookList(bookResults);
       res.status(200).send(list)
       // return res.status(200).send(list);
    }
  })
});


router.post('/api/add-book', function (req, res) {

  let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = token.id;
  console.log(token, "this is verified token")

  Trade.addBook(user, req.body, function (err, info) {
    if (err) {
      return console.log(err);
    }
     return res.status(200).send("successRedirect");
  });

});

router.get('/api/get-profile', function (req, res) {

  let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = token.id;
  console.log(token, "this is verified token")

  UserList.getProfile(user, function (err, data) {
    if (err) {
      return console.error(err);
    }
    return res.status(200).send(data);
  })
});

router.post('/api/update-profile', function (req, res) {

    let token = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = token.id;
    console.log(token, "this is verified token")
    let data = req.body;
    UserList.updateUserProfile(user, data, function (err, profile) {
      if (err) {
        return res.status(200).send("err");
      }
      return res.status(200).send(profile);
    })
});

router.post('/logout', function (req, res) {
  console.log("sending logout")
  if (req.session.user) {
    delete req.session.user
    res.clearCookie('token');
    req.logout();
    res.status(200).send('logged out');
  } else {
    res.status(200).send('not loggedin')
  }
});

router.get('/*', function(req, res) {
  return res.redirect('/');
});

module.exports = router;


function createBookList (itemList) {
  let booksArray = [];
  itemList.items.forEach(function(e) {
    let obj = {};
    obj.title = e.volumeInfo.title;
    obj.author = e.volumeInfo.authors;

    if (!e.volumeInfo.imageLinks) {
      obj.image = "http://www.themagickalcat.com/v/vspfiles/photos/BBBUB5-2T.jpg";
    } else {
      obj.image = e.volumeInfo.imageLinks.thumbnail;
    }
    booksArray.push(obj);
  })
  return booksArray;
}
