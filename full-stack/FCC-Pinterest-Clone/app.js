require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dust = require('dustjs-linkedin');
var passport = require('passport');
var db = require('./models/configDB');
var kleiDust = require('klei-dust');
var session = require('express-session');

mongoose.connect(db.url);

var app = express();

require('./config/passport.js')(passport)


// View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('dust', kleiDust.dust);
app.set('view engine', 'dust');
app.set('view options', {layout: false});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'keyboard cat',
	resave: true,
  saveUninitialized: true
	}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	if (req.user) {
		console.log("we have a user");
  res.locals.user = req.user;
  next();
} else {
	next();
}
});

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


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


console.log(process.env.CONSUMER_KEY);
console.log(process.env.CONSUMER_SECRET);
console.log(process.env.CALLBACK_URL);

module.exports = app;
