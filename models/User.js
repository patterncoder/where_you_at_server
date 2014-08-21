var mongoose = require('mongoose'),
validate = require('../utilities/validators');

var userSchema = mongoose.Schema({
    name: { type: String, required: "{PATH} is required!" },
    photo: {photo_link: String, thumb_link: String, photo_id: String},
    city: String,
    state: String,
    emailAddress: { type: String, validate: validate.validators.emailValidator },
    phoneNumber: String,
    id: Number,
    createdTimeStamp: { type: Number, default: (new Date()).getTime() }
    

});

var User = mongoose.model('User', userSchema);


function createDefaultUsers() {

    User.find({}).exec(function(err,collection){
        if(collection.length ===0) {
            
            
            User.create({
                name: "Alex Maltsev",
                meetupId: 125702562,
                emailAddress: "alex@alex.com",
                photo: {
                    photo_link: "http:\/\/photos2.meetupstatic.com\/photos\/member\/4\/0\/3\/0\/member_171256432.jpeg",
                    thumb_link: "http:\/\/photos4.meetupstatic.com\/photos\/member\/4\/0\/3\/0\/thumb_171256432.jpeg",
                    photo_id: "171256432"},
                phoneNumber: "951-555-1212",
                city: "Temecula",
                state: "CA"
                
            }
            , function (err) {
                if (err) {
                    console.log(err.errors);
                }

            });

            User.create({
                name: "Chris Baily",
                meetupId: 68342152,
                emailAddress: "chris@chris.com",
                photo: {
                    photo_link: "http:\/\/photos3.meetupstatic.com\/photos\/member\/9\/e\/e\/member_80282542.jpeg",
                    thumb_link: "http:\/\/photos3.meetupstatic.com\/photos\/member\/9\/e\/e\/thumb_80282542.jpeg",
                    photo_id: "80282542"
                },
                phoneNumber: "951-676-9567",
                city: "Temecula",
                state: "CA"
                 
            }
            , function (err) {
                if (err) {
                    console.log(err.errors);
                }

            });
            
            
            


        }
    });
}

exports.createDefaultUsers = createDefaultUsers;