// =================================================================
// Dependency declarations
// =================================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routesHTML = require('./routes/html-routes');
var routesAPI = require('./routes/api-routes');

// =================================================================
// Initialize new Express app
// =================================================================
var app = express();

// =================================================================
// View engine setup
// =================================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// =================================================================
// Configure app
// =================================================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routesHTML);
app.use('/api', routesAPI);

// Catch 404 errors, forward to error handlers below.
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// =================================================================
// Error handler - development error handler will print stacktrace
// =================================================================
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
	  		message: err.message,
	  		error: err
		});
	});
}

// =================================================================
// Error handler - production handler not leaking stacktrace to user
// =================================================================
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
