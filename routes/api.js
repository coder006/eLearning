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


//APIs to get the list of students who are in progress and completed by centre
router.get('/studentsByStatus', function(req, res, next) {	
	
	var status = req.query.statuss;
	console.log(status);
	if(typeof(status) != undefined){
		if(status == 'InProgress'){
			console.log("inside in progress");
			Student.find({'centre': req.query.centre,'hours_completed': {$lt : 20}})
					.populate('user')
					.exec(function(err, student) {	     
					        if(!err) {
					            console.log(student.user);
					            res.json(student);
					        }
        			res.end('400');
    		});
		}else{
			Student.find({'centre': req.query.centre,'hours_completed': {$gte : 20}}) 
					.populate('user')
					.exec(function(err, student) {	     
					        if(!err) {
					            console.log(student.user);
					            res.json(student);
					        }
        			res.end('400');
    		});
		}
	}else{
		res.end('500');
	}
});

//API to get students are getting trained under some faculty
router.get('/studentsByFaculty', function(req, res, next){
	console.log('hi there');
		User.findOne({"username": req.query.username}, function(err, user) {
		if(!err){
			console.log('not an error here');
			console.log(user.centre);
			if(user.centre != undefined){
				User.find({"centre":user.centre, "type" : "S"}, function(err,student) {
					if(!err){
						res.json(student);
					}
					res.end('400');
				});
			}
			else {
				res.end('400');
			}
		}else{
			console.log("No username exists");
			res.end(err);
		}			
	});
});

module.exports = router;