var express = require('express');
var mongodb = require('mongodb');
var boom = require('express-boom');
var mongoose = require('mongoose');
var User = require('../models/user').User
var router = express.Router();

var url = 'mongodb://localhost:27017/test1';
var MongoClient = mongodb.MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World' });
});


router.get('/user', function(req, res, next) {
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


router.post('/user', function(req, res) {
    console.log('hello');
    console.log(req.body);
    var user = new User(req.body);
    user.save(function (err, user) {
        if (!err) {
            res.json({'status': 201, 'message': 'user created'});
        }
        if (11000 === err.code || 11001 === err.code) {
            res.end({'status': '403', 'message': 'user already exists!'});
        }
        if(err) {
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

module.exports = router;