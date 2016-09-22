var express = require('express');
var router = express.Router();

var survey = require('../data/survey.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Friend Finder' });
});

router.get('/survey', function(req, res, next) {
	res.render('survey', { survey: survey });
});

module.exports = router;
