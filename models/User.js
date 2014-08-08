var mongoose = require('mongoose'),
validate = require('../utilities/validators');

var userSchema = mongoose.Schema({
    contactName: { type: String, required: "{PATH} is required!" },
    emailAddress: { type: String, validate: validate.validators.emailValidator },
    phoneNumber: String,
    meetupId: String,
    createdTimeStamp: { type: Number, default: (new Date()).getTime() }
    

});

var User = mongoose.model('User', userSchema);


function createDefaultUsers() {

    User.find({}).exec(function(err,collection){
        if(collection.length ===0) {
            
            User.create({
                contactName: "Chris Baily",
                meetupId: "myId1",
                emailAddress: "chris@chris.com",
                phoneNumber:"951-699-3315"
                
            }, function (err) {
                if (err) {
                    console.log(err.errors);
                }

            });
            User.create({
                contactName: "Alex Maltsev",
                meetupId: "myId2",
                emailAddress: "alex@alex.com",
                phoneNumber: "951-676-9567"
                
            }, function (err) {
                if (err) {
                    console.log(err.errors);
                }

            });
            
            
            


        }
    });
}

exports.createDefaultUsers = createDefaultUsers;