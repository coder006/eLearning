var express = require('express');
var mongodb = require('mongodb');
var boom = require('express-boom');
var mongoose = require('mongoose');
var User = require('../models/user').User;
var Student = require('../models/user').Student;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passwordHash = require('password-hash');

var router = express.Router();

var url = 'mongodb://localhost:27017/test1';
var MongoClient = mongodb.MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/learning', function(req, res, next) {
  res.render('index', { title: 'Hello World' });
});

router.get('/user', function(req, res, next) {
    console.log(req.query);
    User.find({}, function(err, users) {
        if(!err) {
            res.json(users);
        }
        res.end('400');
    });
});

router.get('/user/:id', function(req, res, next) {
    console.log('getting one user');
    User.findOne({ 'username': req.params.id }, function(err, user) {
        console.log(user);
        if(!err) {
            res.json(user);
        }
        res.end('400');
    });
});

router.get('/student/:id', function(req, res, next) {
    console.log('getting one user');
    Student
    .findOne({ 'username': req.params.id })
    .populate('user')
    .exec(function(err, student) {
        // console.log(student);
        if(!err) {
            console.log(student.user);
            res.json(student);
        }
        res.end('400');
    });
});

// router.get('/views*', function(req, res, next) {
//     res.render
// });


router.post('/user', function(req, res) {
    console.log('hello');
    console.log(req.body);
    var user = new User(req.body);    
    var hashedPassword = passwordHash.generate(user.password);   
    user.password = hashedPassword;
    user.save(function (err, user) {
        if (!err) {
            if(user.type == 'S') {
                var stud = new Student({
                    username: user.username,
                    user: user._id,  
                    hours_completed: 0,
                    level: 'L1',
                    quiz_taken: false,
                    quiz_passed: false,
                    centre:user.centre
                });

                stud.save(function(err, student) {
                    if(!err) {
                        res.end('Student created: 200');
                    }
                });
            }
            res.json({'status': 201, 'message': 'user created'});
        }
        else if (11000 === err.code || 11001 === err.code) {        
            res.end('500');
            //res.end({'status': '403', 'message': 'user already exists!'});
        }
        else {
            // res.end('400');
            var errors = err.errors;
            var errorValues = {};
            Object.keys(errors).forEach(function(key) {
                var value = errors[key];
                var temp = {'name': value['name'], 'message': value['message']};
                errorValues[key] = temp;
            });
            res.json({'status': '400', 'message': 'errors encountered data validation', 'data': errorValues});
        }
    });
});

router.get('/login', function(req, res) {
  res.sendfile('views/login.html');
});

router.post('/login', 
            function(req, res, next) {
                passport.authenticate('local', function(err, user, info) {
                    if (err) { return next(err); }
                    if (!user) { res.json({'status': '500' , 'message' : 'Failed to login'}); }
                    req.logIn(user, function(err) {
                      if (err) { return next(err); }
                        res.json({'status': '200' , 'type' : user.type , 'message' : 'Logged in successfully'});
                    });
                })(req, res, next);
            });


module.exports = router;