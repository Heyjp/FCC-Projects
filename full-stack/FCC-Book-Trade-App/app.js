require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dust = require('dustjs-linkedin');
var kleiDust = require('klei-dust');
var mongoose = require('mongoose');
var session = require('cookie-session');
var passport = require('passport');

var routes = require('./routes/index');

require('./config/passport')(passport);

var configDb = require("./config/db.js");
mongoose.connect(configDb.url);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  name: 'session',
  secret: process.env.SESSION_KEY,
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', __dirname + '/views');
app.engine('dust', kleiDust.dust);
app.set('view engine', 'dust');
app.set('view options', {layout: false});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res) {

  if (req.user.username) {
    console.log('it works')
    req.user = req.locals.user
  } else {
    next();
  }

})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
