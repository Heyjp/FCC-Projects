require('dotenv').config();

var express = require('express');
var app = express();
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dust = require('dustjs-linkedin');
var cons = require('consolidate');
var session = require('cookie-session');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var config = require('./config/config');

mongoose.connect(config.url);

require('./config/passport')(passport);

var routes = require('./routes/index');

// assign the dust engine to .dust files
app.engine('dust', cons.dust);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  name: 'session',
  secret: "keyboard cat",
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
