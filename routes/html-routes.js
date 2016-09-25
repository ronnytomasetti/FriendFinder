var express = require('express');
var router = express.Router();

// =================================================================
// Pull in QuestionsDB and FriendDB js files with require
// =================================================================
var Questions = require('../data/QuestionsDB.js');
var FriendsDB = require('../data/FriendsDB.js');

// =================================================================
// GET API route serving home page
// =================================================================
router.get('/', function(req, res) {
  res.render('index', { title : 'Friend Finder' });
});

// =================================================================
// GET API route serving survey template with questions array.
// Route requires user json object as parameter.
// =================================================================
router.get('/take-survey/:user', function(req, res) {

	//TODO: VALIDATE USER IS TYPE JSON WITH USER AND IMG URL

	res.render('survey', { questions : Questions,
								user : JSON.parse(decodeURIComponent(req.params.user)) });
});

// =================================================================
// GET API route serving survey results page
// Beat match logic happens here. Route requires uuid in order
// to find best match for that user.
// =================================================================
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
