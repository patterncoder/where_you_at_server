
/*
 * GET home page.
 */
var User = require('mongoose').model('User');



exports.index = function(req, res){
    User.find({}).exec(function(err, collection){
        res.send(collection);
        }
    )
    
};