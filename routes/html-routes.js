var express = require('express');
var router = express.Router();

var Questions = require('../data/QuestionsDB.js');
var FriendsDB = require('../data/FriendsDB.js');

router.get('/', function(req, res) {
  res.render('index', { title : 'Friend Finder' });
});

router.get('/take-survey/:user', function(req, res) {
	res.render('survey', { questions : Questions,
								user : JSON.parse(decodeURIComponent(req.params.user)) });
});

router.get('/survey-results/:uuid', function(req, res) {
	var reqUUID = req.params.uuid;

	var currentUser = {};
	var friendsArray = [];
	var bestFriend = {};
	var lowestScore;

	for (var index in FriendsDB) {
		if (FriendsDB[index].uuid === reqUUID)
			currentUser = FriendsDB[index];
		else
			friendsArray.push(FriendsDB[index]);
	}

	for (var i in friendsArray) {
		var totalDifference = 0;

		for (var f in currentUser.scores) {
			totalDifference += Math.abs(parseInt(currentUser.scores[f]) - parseInt(friendsArray[i].scores[f]));
		}

		if (totalDifference < lowestScore || lowestScore === undefined) {
			lowestScore = totalDifference;
			bestFriend = friendsArray[i];
		}
	}

	res.render('survey-results', { user : currentUser, friend : bestFriend });
});

module.exports = router;
