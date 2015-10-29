var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/test1';
var User = require('../models/user').User;
var Level = require('../models/user').Level;
var Centre = require('../models/user').Centre;
var Student = require('../models/user').Student;


router.get('/userlist', function(req, res, next) {
	console.log("Within userlist");
	User
		.find({"centre":req.query.centre})
		.select("_id username")
		.exec( function(err, users) {
			if(!err)
				res.json(users);
			else
				res.end('400');
		});
});

router.get('/students', function(req, res, next) {
	// var body = req.body;
	Students.find({'centre': req.query.centre, 'noOfHoursCompleted': {$gte : 20}}, 
		function(err, users) {
			if(!err) {
				res.json(users);
			}
			res.end('400');
		});
	// if()
	// Student.find({});
});

router.post('/students', function(req, res, next) {
	console.log("Creating students");
	var student = new Student(req.body);
	console.log(req.body);
	student.save( function(err, user) {
		if (!err) {
				req.body.levels.forEach(function(item) {
				console.log(item);
				console.log(item["remaining"]);
			})
            res.json({'status': 201, 'message': 'student record added'});
        } else
        	res.end(err);
	});
});


//Test api
router.get('/findStudentDetailsByCompletion',function(req,res,next){
	console.log("Fetching student details who has completed the level");
	
	Student
		.find({"centre": req.query.centre})
		.select("username")
		.exec( function(err, students) {
			if(!err)
				res.json(students.user.fname);
			else
				res.end('400');
		});

});

// API to get all centres
router.get('/centres', function(req, res, next) {
	Centre.find({}, function(err, centres) {
		if(!err)
			res.json(centres);
		else
			res.end(err);
	});
});

// API to get all details given a centre. Centre given in query parameter
router.get('/students', function(req, res, next) {
	Student.find({"centre": req.query.centre}, function(err, students) {
		if(!err)
			res.json(students);
		else
			res.end(err);
	});
});

// API to insert data into centre
router.post('/centres', function(req, res, next) {
	var centre = new Centre(req.body);
	centre.save(function(err, centre) {
		if(!err) {
			res.status(200).send();
		} else
			res.status(300).send();
	});
});
module.exports = router;