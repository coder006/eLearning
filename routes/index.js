var express = require('express');
var mongodb = require('mongodb');
var boom = require('express-boom');
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
    MongoClient.connect(url, function(err, db) {
        if(err) {
            console.log('Unable to connect to mongodb server!');
        }
        else {
            console.log('Connection established to mongodb server at url', url);
            
            var collection = db.collection('users');
            collection.find({}).toArray(function(err, result) {
                if(err) {
                    console.log( 'Error:', err );
                }
                else if(result.length) {
                    console.log('Found', result);
                    res.json(result);
                }
                else {
                    console.log( 'No documents matched the criteria.' );
                }
                // Close database connection
                db.close();
            });
        }
    });
});

router.get('/user/:id', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if(err) {
            console.log('Unable to connect to mongodb server!');
        }
        else {
            console.log('Connection established to mongodb server at url', url);
            
            var params = req.params;
            var collection = db.collection('users');
            collection.find( {username: params.id} ).toArray(function(err, result) {
                if(err) {
                    console.log( 'Error:', err );
                }
                else if(result.length) {
                    console.log('Found', result);
                    res.json(result[0]);
                }
                else {
                    console.log( 'No documents matched the criteria.' );
                }
                // Close database connection
                db.close();
            });
            console.log(params.id);
        }
    });
});

router.post('/user', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err) {
            console.log('Unable to connect to mongodb server!');
        }
        else {
            console.log('Connection established to mongodb server at url', url);
            
            var collection = db.collection('users');
            collection.find( { username: req.body.username } ).toArray(function(err, result) {
                if(err) {
                    console.log("Error", err);
                    db.close();
                }
                else if(result.length) {
                    console.log("username already exists!");
                    res.boom.badData('username already exists!');
                    db.close();
                }
                else {
                    collection.insert(req.body, function(err, result) {
                        if(err) {
                            console.log("Error", err);
                        }
                        else {
                            res.end('200');
                        }
                        db.close();
                    });
                    console.log(req.body);
                }
            });
        }
    });
});
module.exports = router;
