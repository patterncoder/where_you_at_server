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