var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    meetupId: String

});

var User = mongoose.model('User', userSchema);


function createDefaultUsers() {

    User.find({}).exec(function(err,collection){
        if(collection.length ===0) {
            
            User.create({ name: "Chris Baily", meetupId: "myId1" }, function(err, item){ });
            User.create({ name: "Alex Maltsev", meetupId: "myId2" }, function (err, item) { });
            User.create({ name: "Greg Griffes", meetupId: "myId3" }, function (err, item) { });
            User.create({ name: "Kirk Bowman", meetupId: "myId4" }, function (err, item) { });
            User.create({ name: "Sean Payne", meetupId: "myId5" }, function (err, item) { });
            User.create({ name: "Ben Burruel", meetupId: "myId6" }, function (err, item) { });
            User.create({ name: "Wendell Beverly", meetupId: "myId7" }, function (err, item) { });
            
            


        }
    });
}

exports.createDefaultUsers = createDefaultUsers;