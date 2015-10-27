var User = require('./controller/user');

exports.endpoints = [
    { method: 'POST', path: '/user', config: User.create },
    { method: 'GET', path: '/user', config: User.getAll },
    { method: 'GET', path: '/user/{username}', config: User.getOne },
];