var Image = require('../config/imghandler.js')

module.exports = function (app, passport) {

  // Define routes.
  app.get('/', function(req, res) {
    if (!req.user) {
      Image.showImages(null, function (err, doc) {
        res.render('child', {images: doc});
      });
    } else {
      Image.showImages(null, function (err, doc) {
        res.render('child', {images: doc, user: true});
      });
    }
    });

    app.get('/auth/twitter',
    passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
      passport.authenticate('twitter', { failureRedirect: '/' }),
      function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

        // route for logging out
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile');
  });

  app.get('/profile/images', isLoggedIn, function(req, res) {
      var user = req.user;
      Image.showImages(user, function (err, doc) {
        console.log(doc[0]);
        res.render('child', {images: doc, delImg: true});
      })
    });


  app.post('/upload', isLoggedIn, function (req, res) {

    console.log(req.body, "this is req.body");
    var user = req.user;
    var img = req.body;

    Image.storeImage(user, img, function (err, doc) {
      res.redirect('/');
    });

  });

  app.delete('/delete', isLoggedIn, function (req, res) {
    var id = req.body.id;
    var user = req.user;
    console.log(id);
  if (id !== undefined ) {
      Image.deleteImg(user, id, function (err, data) {
        if (err) {
          res.redirect('/')
        }
        console.log(data);
        res.status(200).send("success")
    });
  } else {
    res.redirect("/profile/images")
  }
});

app.post('/likes', function (req, res) {
    if (req.user) {
      var id = req.body.id;
      var user = req.user.username;
        Image.addOrRemoveUser(user, id, function (err, likes) {
          if (err) {
            console.log(err)
          }
          res.json(likes);
        });
      } else {
        res.json('error');
      }
  });

  app.get('/test', function (req, res) {
    res.render('test');
  });

  app.get('/profile/:id', function (req, res) {
    var id = req.params.id;
    if (req.user) {
    Image.userImages(id, function (err, doc) {
      console.log(doc);
      res.render('child', {images: doc, user: true, title: true});
    });
  } else {
    Image.userImages(id, function (err, doc) {
      console.log(doc);
      res.render('child', {images: doc, user: false, title: true});
    });
  }
  });

  app.get('/add-image', function (req, res) {
    res.render('add-image')
  })

 };

 function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
};

function isLoggedIn (req, res, next) {
  if (req.user) {
    return next();
  } else {
      return res.redirect('/')
  }
}
