var express = require('express');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passwordHash = require('password-hash');
var User = require('../models/user').User;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    User.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        console.log("error while fetching user");
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

     if(passwordHash.isHashed(user.password)){
      console.log("Password is hashed");
        if(!passwordHash.verify(password, user.password)){
            console.log("Password didn't match");
            return done(null, false, { message: 'Incorrect password.' });
        }            
      }else{
        console.log("Password not hashed");
        if(user.password!= password){
          console.log("Password didn't match");
          return done(null, false, { message: 'Incorrect password.' });
        }
      }

      return done(null, user);
    });
  });
}));


module.exports = router;
