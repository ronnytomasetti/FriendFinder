var express = require('express');
var router = express.Router();

var SurveysDB = require('../data/SurveysDB.js');

router.get('/surveys', function(req, res) {
	res.json(SurveysDB);
});

router.post('/surveys', function(req, res) {
	SurveysDB.push(req.body);
	res.json(true);
});

module.exports = router;
