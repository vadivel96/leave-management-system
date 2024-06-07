require('dotenv').config();
require('newrelic');
var createError = require('http-errors');
var express = require('express');
var path = require('path');

//all custom routes
const { routes } = require('./routes/path/routePath');

//all third party middlewares
const { middlewares } = require('./middlewares/third_party_middlewares/thirdPartyMiddlewares');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Use a loop to apply each 3rd party middleware
middlewares.forEach(middleware => {
  app.use(middleware)
});

//use a loop to apply each custom middleware
routes.forEach(route => {
  app.use(route.path, route.router);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
