var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/test1';
var User = require('../models/user').User;
var Level = require('../models/user').Level;

router.get('/userlist', function(req, res, next) {
	console.log("Within userlist");
	User.find({"centre":req.query.centre}, function(err, users) {
		if(!err)
			res.json(users);
		else
			res.end('400');
	});
});

router.post('/users', function(req, res, next) {
	console.log("Entered post users");
	var user = new User(req.body);
	console.log(req.body);
	user.save( function(err, user) {
		if (!err) {
				req.body.levels.forEach(function(item) {
				console.log(item);
				console.log(item["remaining"]);
			})
            res.json({'status': 201, 'message': 'user created'});
        } else
        	res.end(err);
	});
});

module.exports = router;