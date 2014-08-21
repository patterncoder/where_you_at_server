var request = require('request');
var User = require('mongoose').model('User');

exports.getUsers = function (req, res) {

    User.find({}).exec(function (err, collection) {
        res.send(collection);
    });

}

exports.getUserById = function (req, res) {

    User.findOne({ _id: req.params.id }).exec(function (err, user) {
        res.send(user);
    });
}

exports.getMeetupInfo = function (req, res) {
    request('http://api.meetup.com/2/members/?group_id=1667332&only=id,name,photo&key=41437d18354d7929412b7367732333', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });
    
    
    };