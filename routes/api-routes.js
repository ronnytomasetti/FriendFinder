var express = require('express');
var router = express.Router();

// =================================================================
// Pull in Friends list DB and Friend object js files with require
// =================================================================
var FriendsDB = require('../data/FriendsDB.js');
var Friend = require('../data/Friend.js');

// =================================================================
// GET API route responds with list of friends in FriendsDB
// =================================================================
router.get('/friends', function(req, res) {
	res.json(FriendsDB);
});

// =================================================================
// POST API route takes in new friend from req object, creates uuid,
// and pushes to FriendsDB file.
// =================================================================
router.post('/friends', function(req, res) {
	var name = req.body.name;
	var photo = req.body.photo;
	var scores = req.body['scores[]'];
	var uuid = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

	var newFriend = new Friend(name, photo, scores, uuid);

	FriendsDB.push(newFriend);
	res.status(200).json(newFriend);
});

module.exports = router;
