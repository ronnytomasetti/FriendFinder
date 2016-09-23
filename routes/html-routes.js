var express = require('express');
var router = express.Router();

var questions = require('../data/SurveyQuestions.js');

router.get('/', function(req, res) {
  res.render('index', { title : 'Friend Finder' });
});

router.get('/survey', function(req, res) {
	res.render('survey', { questions : questions });
});

router.get('/survey-results/:name', function(req, res) {
	var name = req.params.name;
	res.render('survey-results', { name : name });
});

module.exports = router;
