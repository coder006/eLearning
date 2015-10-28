var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/test1';

router.get('/userlist', function(req, res, next) {
	console.log("Within userlist");
	console.log(req.query);
	res.send(req.query);
});

module.exports = router;