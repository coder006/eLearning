var mongoose = require('mongoose');
var User = require('../model/user').User;
var Boom = require('boom');
var Joi = require('joi');

exports.getAll = {
    handler: function(request, reply) {
        User.find({}, function(err, users) {
            if(!err) {
                return reply(users);
            }
            return reply(Boom.badImplementation(err));
        });
    }
};

exports.getOne = {
    handler: function(request, reply) {
        User.findOne({ 'username': request.params.username }, function(err, user) {
            if(!err) {
                return reply(user);
            }
            return reply(Boom.badImplemntation(err));
        });
    }
};

exports.create = {
  handler: function (request, reply) {
    var user = new User(request.payload);
    user.save(function (err, user) {
      if (!err) {
        return reply(user).created('/user/' + user._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("username already exists!"));
      }
      return reply(Boom.forbidden(err)); // HTTP 403
    });
  }
};