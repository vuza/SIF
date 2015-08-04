// General dependencies
var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');

// Init App
var app = express();

// Authentication
app.use(expressSession({secret: 'xxx'}));
app.use(passport.initialize());
app.use(passport.session());
var authController = require('./controllers/authController');
authController.init(passport);

// Connect to DB
mongoose.connect('mongodb://localhost/sif');

// Init Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Init Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

// Start App
app.use(router);
app.listen(5001);