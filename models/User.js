var mongoose = require('mongoose'),
validate = require('../utilities/validators');

var userSchema = mongoose.Schema({
    contactName: { type: String, required: "{PATH} is required!" },
    emailAddress: { type: String, validate: validate.validators.emailValidator },
    phoneNumber: String,
    meetupId: String,
    createdTimeStamp: Date,
    meetupId: String

});

var User = mongoose.model('User', userSchema);


function createDefaultUsers() {

    User.find({}).exec(function(err,collection){
        if(collection.length ===0) {
            
            User.create({ contactName: "Chris Baily", meetupId: "myId1" }, function (err) {
                if (err) {
                    console.log(err.errors);
                }

            });
            
            
            


        }
    });
}

exports.createDefaultUsers = createDefaultUsers;